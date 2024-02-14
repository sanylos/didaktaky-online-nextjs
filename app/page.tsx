"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "./page.scss"
import { FaArrowDown } from "react-icons/fa6";
import { MdOutlineInsights, MdOutlineMemory } from "react-icons/md";
import { PiExamDuotone } from "react-icons/pi";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { relative } from "path";
import { useEffect, useState } from "react";
import { supabase } from "@/api";
import CountUp from 'react-countup';

export default function Home() {

  const [answeredExerciseCount, setAnsweredExerciseCount] = useState(0);
  const [submittedTestCount, setSubmittedTestCount] = useState(0);
  const [reviews] = useState([
    {
      id: 1,
      comment: "Nabídka maturitní četby na této stránce je velmi široká a pestrá. Najdete zde všechny povinné knihy pro maturitu, ale i mnoho dalších zajímavých titulů. Oceňuji, že knihy jsou dostupné v elektronické i tištěné podobě, takže si každý může vybrat tu variantu, která mu více vyhovuje. Ceny knih jsou také velmi příznivé.",
      userName: "Šimon Němec",
      rating: 5,
      school: "Střední škola",
    },
    {
      id: 2,
      comment: "Aplikaci jsem začal používat, abych se připravil na přijímačky na střední školu. Nabízí širokou škálu testů z předchozích let, takže jsem si mohl vybrat ty, které jsem potřeboval. Stránka je přehledná a snadno se používá. Velmi oceňuji i možnost procvičovat si jednotlivé typy úloh i celé testy. Díky této aplikaci jsem se na přijímačky cítil skvěle připravený a byl jsem úspěšný.",
      userName: "Michael Pokorný",
      rating: 5,
      school: "Základní škola"
    },
    {
      id: 3,
      comment: "Tuto stránku používám pro procvičování maturitní četby. Líbí se mi, že si můžu texty zakoupit přímo v aplikaci a nemusím je hledat jinde. Jsou zde i různé typy cvičení, takže si můžu procvičit všechny aspekty maturitní zkoušky. Jediné, co bych vytkla, je absence funkce pro dělání poznámek.",
      userName: "Elena Poláková",
      rating: 4,
      school: "Střední škola",
    },
    {
      id: 4,
      comment: "Vadí mi, že aplikace nefunguje offline. To je nepraktické, když se chci učit někde, kde není internetové připojení.",
      userName: "Patrik Kratochvíl",
      rating: 2,
      school: "Střední škola",
    },
    {
      id: 5,
      comment: "Tento web je naprosto úžasný! Pomohl mi se skvěle připravit na maturitu z matematiky. Díky němu jsem si procvičila všechny typy příkladů a naučila se je řešit rychle a správně. Web je navíc moc přehledný a snadno se používá. Vřele doporučuji všem studentům, kteří se chtějí na maturitu zodpovědně připravit.",
      userName: "Jasmína Kučerová",
      rating: 5,
      school: "Střední škola",
    },
    {
      id: 6,
      comment: "Aplikace je užitečná pro procvičování didaktických testů, ale má i své chyby. Někdy se mi stane, že se web zasekne a nevyhodnotí moji odpověď. Také mi vadí, že pro používání je potřeba internetové připojení. To je nepraktické, když se chci učit někde, kde není internet.",
      userName: "Nikola Soukupová",
      rating: 3,
      school: "Základní škola",
    },
    {
      id: 7,
      comment: "Oceňuji, že si můžu vybrat testy z různých předmětů. Také se mi líbí, že stránka sleduje mé výsledky a zobrazuje mi je v statistikách. To mi pomáhá sledovat svůj pokrok a motivovat se k dalšímu studiu. Jediné, co bych stránce vytknul, je rychlost, se slabším internetem na vesnici se zasekává.",
      userName: "Kryštof Kříž",
      rating: 4,
      school: "Základní škola",
    },
    {
      id: 8,
      comment: "Oceňuji, že si můžu vybrat testy z různých předmětů. Také se mi líbí, že stránka sleduje mé výsledky a zobrazuje mi je v statistikách. To mi pomáhá sledovat svůj pokrok a motivovat se k dalšímu studiu. Jediné, co bych stránce vytknul, je rychlost, se slabším internetem na vesnici se zasekává.",
      userName: "Kryštof Kříž",
      rating: 4,
      school: "Základní škola",
    },
    {
      id: 9,
      comment: "Tento web je skvělý nástroj pro procvičování didaktických testů. Oceňuji, že si můžu vybrat testy z různých předmětů a ročníků. Také se mi líbí, že web sleduje mé výsledky a zobrazuje mi je v statistikách. To mi pomáhá sledovat můj pokrok a motivovat se k dalšímu učení.",
      userName: "Samuel Musil",
      rating: 4,
      school: "Střední škola",
    },
  ]);

  const fetchCountOfAnsweredExercises = async () => {
    const { count, error } = await supabase
      .from('userAnswers')
      .select('*', { count: 'exact', head: true });
    if (error) console.log(error);
    else {
      if (count) setAnsweredExerciseCount(count);
    }
  }

  const fetchCountOfSubmittedTests = async () => {
    const { count, error } = await supabase
      .from('userTests')
      .select('*', { count: 'exact', head: true });
    if (error) console.log(error);
    else {
      if (count) setSubmittedTestCount(count);
    }
  }

  useEffect(() => {
    fetchCountOfAnsweredExercises();
    fetchCountOfSubmittedTests();
  }, []);

  return (
    <div className="d-flex flex-column main align-items-center">

      <section className="purpleAnimatedBackground shadow-lg">
        <div className="d-flex flex-column justify-content-center mobileImageWrapper"
          style={{ height: "100vh", position: "relative" }}>
          <div className="main-title fs-1" style={{ position: "absolute" }}>
            <div className="fw-bold">Moderní a efektivní příprava</div>
            <div>na přijímací zkoušky a maturitu</div>
            <div className="d-flex flex-row justify-content-start">
              <button className="btn btn-dark shadow-lg rounded-5 my-3 mx-1 p-2">Začít procvičovat</button>
              <a className="btn btn-dark shadow-lg rounded-5 my-3 mx-1 p-2 w-auto px-3" href="#about"><FaArrowDown /></a>
            </div>
          </div>
          <img src="/prijimacky-online-phone-mockup.png" className="desktop" />
          <div style={{ position: "absolute", bottom: "10vh" }}
            className="container-fluid d-flex align-items-center justify-content-start">
            <div className="mx-5" v-if="answeredExerciseCount">
              <span className="fs-1 fw-bold"><CountUp start={0} end={answeredExerciseCount} duration={5} /></span><span className="fs-6"> vyplněných cvičení</span>
            </div>
            <div className="mx-5" v-if="submittedTestCount">
              <span className="fs-1 fw-bold"><CountUp start={0} end={submittedTestCount} duration={5} /></span><span className="fs-6"> vyplněných testů</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mt-5 mb-5" id="about">
          <div className="text-center mx-2">
            <div className="text-dark fs-2 fw-normal mb-5">Připravte se na zkoušky s jistotou a zvládněte je s přehledem!</div>
            <div className="row d-flex align-items-center mx-1">

              <div className="col-sm-4 mb-3 mb-sm-0">
                <div className="card bg-secondary-subtle shadow-lg border-23 border-dark rounded-4">
                  <div className="card-body">
                    <MdOutlineMemory className="fs-1" />
                    <div className="fs-3 mb-2 fw-medium">Rozsáhlá databáze testů</div>
                    <p className="card-text">Procvičujte si autentické testy z minulých let, rozdělené podle předmětů nebo
                      variant.</p>
                    <a className="btn btn-dark">Zkusit test</a>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 mb-3 mb-sm-0">
                <div className="card bg-secondary-subtle shadow-lg border-23 border-dark rounded-4">
                  <div className="card-body">
                    <PiExamDuotone className="fs-1" />
                    <div className="fs-3 mb-2 fw-medium">Reálné zkouškové podmínky</div>
                    <p className="card-text">Naše cvičení simulují reálné zkoušky, abyste si osvojili potřebné znalosti a
                      dovednosti.</p>
                    <a className="btn btn-dark">Začít procvičovat</a>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 mb-3 mb-sm-0">
                <div className="card bg-secondary-subtle shadow-lg border-23 border-dark rounded-4">
                  <div className="card-body">
                    <MdOutlineInsights className="fs-1" />
                    <div className="fs-3 mb-2 fw-medium">Přehled pokroku</div>
                    <p className="card-text">Sledujte svůj vývoj a motivujte se k dosažení vašich cílů.</p>
                    <a className="btn btn-dark">Zobrazit přehled</a>
                  </div>
                </div>
              </div>

            </div>
          </div >
        </div >
      </section >
      <hr className="text-dark w-100" />
      <section>
        <div className="mt-5 mb-5" id="reviews">
          <div className="text-center mx-2">
            <div className="text-dark fs-2 fw-normal mb-5">Recenze</div>
            <div className="h-100 d-flex align-items-center justify-content-center">
              <div id="carouselExample" className="carousel carousel-dark slide w-100">
                <div className="carousel-inner">
                  {reviews.map((review) => (
                    <div className={"carousel-item " + (review.id == 1 && "active")} key={review.id}>
                      <div className="container-fluid d-flex justify-content-center align-items-center w-75">
                        <div className="card shadow-lg">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <span>Recenze</span>
                            <span>
                              {Array.from({ length: review.rating }, (_, i) => (
                                <FaStar key={i} />
                              ))}
                              {Array.from({ length: 5 - review.rating }, (_, i) => (
                                <FaRegStar key={i} />
                              ))}
                            </span>
                          </div>
                          <div className="card-body">
                            <blockquote className="blockquote mb-0">
                              <p>{review.comment}</p>
                              <footer className="blockquote-footer">{review.userName}, <cite title="Source Title">{review.school}</cite></footer>
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
}
