//@ts-nocheck
import "./page.scss"
import { FaArrowDown } from "react-icons/fa6";
import { MdOutlineInsights, MdOutlineMemory } from "react-icons/md";
import { PiExamDuotone } from "react-icons/pi";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "@/api";
import CountUp from 'react-countup';
import Link from "next/link";
import Image from "next/image";

export async function getContent() {
  const { data, error } = await supabase
    .from('answer_counts')
    .select('*')
    .single()

  return { answeredExerciseCount: data.exercise_answers_count, submittedTestCount: data.answered_tests_count };
}

export default async function Home() {
  const { answeredExerciseCount, submittedTestCount } = await getContent();
  const reviews = [
    {
      id: 1,
      comment: "Wow, tenhle web s maturitní četbou je fakt bomba! Mají tu všechno - povinnou četbu i spoustu dalších super knížek. A co je nejlepší? Můžu si je stáhnout, navíc ceny jsou fakt nízké, určitě doporučuji!",
      userName: "Šimon Němec",
      rating: 5,
      school: "Střední škola"
    },
    {
      id: 2,
      comment: "Díky tomuto webu jsem se dostal na střední! Nabízí mraky testů z minulých let, takže jsem si mohl vybrat ty, které jsem pro přijímačky potřeboval. Stránka je přehledná a jednoduchá na používání. Super je i možnost procvičovat si jednotlivé typy úloh i celé testy. Díky nim jsem se na přijímačky cítil perfektně připravený a klaplo to!",
      userName: "Michael Pokorný",
      rating: 5,
      school: "Základní škola"
    },
    {
      id: 3,
      comment: "Na procvičování maturitní četby používám tenhle web už dlouho. Je super, že si můžu texty koupit přímo tady, některé i zdarma, a nemusím je shánět jinde. Mají tu i různé typy cvičení, takže si můžu procvičit všechno, co na maturitě bude potřeba. Jediné, co mi chybí, je možnost si do textů dělat poznámky.",
      userName: "Elena Poláková",
      rating: 4,
      school: "Střední škola"
    },
    {
      id: 4,
      comment: "Největší mínus je, že tenhle web nejde používat offline. To je fakt otravný, když se chci učit někde, kde není internet. Jinak by to ale šlo.",
      userName: "Patrik Kratochvíl",
      rating: 2,
      school: "Střední škola"
    },
    {
      id: 5,
      comment: "Díky tomuto webu jsem zvládla maturitu z matematiky na jedničku! Procvičila jsem si tu všechny typy příkladů a naučila se je řešit rychle a správně. Web je navíc super přehledný a jednoduchý na používání. Vřele ho doporučuji všem studentům, co se chtějí na maturitu z matiky fakt připravit.",
      userName: "Jasmína Kučerová",
      rating: 5,
      school: "Střední škola"
    },
    {
      id: 6,
      comment: "Na procvičování didakťáků je tenhle web docela fajn, ale má i své mouchy. Někdy se mi stane, že se web zasekne a nejde mi vyhodnotit odpověď. A taky mi vadí, že na používání je potřeba internet. To je fakt otravný, když se chci učit někde, kde není signál.",
      userName: "Nikola Soukupová",
      rating: 3,
      school: "Základní škola"
    },
    {
      id: 7,
      comment: "Super je, že si můžu vybrat testy z různých předmětů. A taky se mi líbí, že web sleduje mé výsledky a ukazuje mi je v statistikách. To mi pomáhá sledovat můj pokrok a učit se dál. Jediné, co bych webu vytknul, je rychlost. Na vesnici s pomalým internetem se dost seká.",
      userName: "Kryštof Kříž",
      rating: 4,
      school: "Základní škola"
    },
    {
      id: 8,
      comment: "Tento web je skvělý nástroj pro procvičování didaktických testů. Oceňuji, že si můžu vybrat testy z různých předmětů a ročníků. Také se mi líbí, že web sleduje mé výsledky a zobrazuje mi je v statistikách. To mi pomáhá sledovat můj pokrok a motivovat se k dalšímu učení.",
      userName: "Samuel Musil",
      rating: 4,
      school: "Střední škola",
    },
  ];

  return (
    <div className="d-flex flex-column main align-items-center">

      <section className="purpleAnimatedBackground shadow-lg">
        <div className="d-flex flex-column justify-content-center mobileImageWrapper"
          style={{ height: "100vh", position: "relative" }}>
          <div className="main-title" style={{ position: "absolute" }}>
            <div>
              <h1 className="fw-bold">Moderní a efektivní příprava</h1>
              <h2>na přijímací zkoušky a maturitu</h2>
            </div>
            <div className="d-flex flex-row justify-content-start">
              <Link href="/procvicovani" className="btn btn-dark shadow-lg rounded-5 my-3 mx-1 p-2">Začít procvičovat</Link>
              <a className="btn btn-dark shadow-lg rounded-5 my-3 mx-1 p-2 w-auto px-3" href="#about"><FaArrowDown /></a>
            </div>
          </div>
          <Image width={1000} height={1000} src="/prijimacky-online-phone-mockup.png" className="desktop" alt="didaktaky-online-phone-mockup" />
          <div style={{ position: "absolute", bottom: "10vh" }}
            className="container-fluid d-flex align-items-center justify-content-start">
            <div className="mx-5" v-if="answeredExerciseCount">
              <span className="fs-1 fw-bold">{answeredExerciseCount}</span><span className="fs-6"> vyplněných cvičení</span>
            </div>
            <div className="mx-5" v-if="submittedTestCount">
              <span className="fs-1 fw-bold">{submittedTestCount}</span><span className="fs-6"> vyplněných testů</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-3">
        <div className="mt-5 mb-5" id="about">
          <div className="text-center mx-2">
            <h2 className="text-dark fw-normal mb-5">Připravte se na zkoušky a dosáhněte úspěchu!</h2>
            <div className="row d-flex align-items-center mx-1">

              <div className="col-sm-4 mb-3 mb-sm-0">
                <div className="card bg-secondary-subtle shadow-lg border-23 border-dark rounded-4">
                  <div className="card-body">
                    <MdOutlineMemory className="fs-1" />
                    <div className="fs-3 mb-2 fw-medium">Rozsáhlá databáze testů</div>
                    <p className="card-text">Procvičujte si autentické testy z minulých let, rozdělené podle předmětů nebo
                      variant.</p>
                    <Link href="/test" className="btn btn-dark">Zkusit test</Link>
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
                    <Link href="/procvicovani" className="btn btn-dark">Začít procvičovat</Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 mb-3 mb-sm-0">
                <div className="card bg-secondary-subtle shadow-lg border-23 border-dark rounded-4">
                  <div className="card-body">
                    <MdOutlineInsights className="fs-1" />
                    <div className="fs-3 mb-2 fw-medium">Přehled pokroku</div>
                    <p className="card-text">Sledujte svůj vývoj a motivujte se k dosažení vašich cílů.</p>
                    <Link href="/prehled" className="btn btn-dark">Zobrazit přehled</Link>
                  </div>
                </div>
              </div>

            </div>
          </div >
        </div >
      </section >
      <section className="bg-blue-3" style={{ height: '100vh' }}>
        <div className="mt-5 mb-5" id="reviews">
          <div className="text-center mx-2">
            <div className="text-dark fs-2 fw-normal mb-5">Recenze</div>
            <div className="h-100 d-flex align-items-center justify-content-center">
              <div id="carouselExample" className="carousel carousel-dark slide w-100 h-100">
                <div className="carousel-inner">
                  {reviews.map((review) => (
                    <div className={"carousel-item " + (review.id == 1 && "active")} key={review.id}>
                      <div className="container-fluid d-flex justify-content-center align-items-center w-75">
                        <div className="card shadow-lg bg-secondary-subtle">
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
                              <p style={{ fontSize: '1rem' }}>{review.comment}</p>
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
