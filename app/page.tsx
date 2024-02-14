"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "./page.scss"
import { FaArrowDown } from "react-icons/fa6";
import { MdOutlineInsights, MdOutlineMemory } from "react-icons/md";
import { PiExamDuotone } from "react-icons/pi";
import { relative } from "path";
import { useEffect, useState } from "react";
import { supabase } from "@/api";
import CountUp from 'react-countup';

export default function Home() {

  const [answeredExerciseCount, setAnsweredExerciseCount] = useState(0);
  const [submittedTestCount, setSubmittedTestCount] = useState(0);

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
            <div className="text-white fs-2 fw-normal mb-5">Připravte se na zkoušky s jistotou a zvládněte je s přehledem!</div>
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

    </div >
  );
}
