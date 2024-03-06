// @ts-nocheck
"use client"
import { supabase } from '@/api'
import { useUser } from '@/app/UserContext'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Chart } from 'chart.js/auto'
import { FaDiagramSuccessor } from 'react-icons/fa6'
import { getNameByShortcut } from '@/app/utils/shortcutHandler'

const CviceniPrehledPage = () => {
  const [data, setData] = useState();
  const { userData } = useUser();
  const searchParams = useSearchParams();
  const examType = searchParams.get('zkouska');
  const subject = searchParams.get('predmet');
  const [groupedData, setGroupedData] = useState();

  const groupData = () => {
    let correctGroup = [];
    let incorrectGroup = [];
    let labels = data.map(group => group.exercisegroup);
    let uniqueLabels = [];
    labels.forEach(label => {
      if (!uniqueLabels.includes(label)) {
        uniqueLabels.push(label);
      }
    });
    uniqueLabels.forEach((label => {
      const correctAnswerGroup = data.find((group) => group.exercisegroup === label && group.iscorrect == true);
      const incorrectAnswerGroup = data.find((group) => group.exercisegroup === label && group.iscorrect == false);
      if (correctAnswerGroup) { correctGroup.push(correctAnswerGroup.count); } else correctGroup.push(0);
      if (incorrectAnswerGroup) { incorrectGroup.push(incorrectAnswerGroup.count); } else incorrectGroup.push(0);
    }))

    let successRates = []
    for (let i = 0; i < correctGroup.length; i++) {
      successRates.push((100 / (correctGroup[i] + incorrectGroup[i])) * correctGroup[i]);
    }
    setGroupedData({ labels: uniqueLabels, successRates, correctCounts: correctGroup, incorrectCounts: incorrectGroup })
  }

  const fetchExerciseGroups = async () => {
    const { data, error } = await supabase.rpc('getcountexercisegroups', {
      user_id: userData.user.id
    })
      .eq('subject', subject)
      .eq('examtype', examType)
    console.log(data)
    if (error) console.log(error);
    if (data) setData(data);
  }
  useEffect(() => {
    if (userData) {
      fetchExerciseGroups();
    }
  }, [userData, searchParams])

  useEffect(() => {
    if (data) {
      groupData();
    }
  }, [data])

  const chartCanvas = useRef(null);
  useEffect(() => {
    if (groupedData) {
      const ctx = chartCanvas.current;
      const successRateChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: groupedData.labels,
          datasets: [{
            label: '% správných odpovědí',
            data: groupedData.successRates,
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              max: 100
            }
          }
        }
      })
      return () => {
        successRateChart.destroy();
      }
    }
  }, [groupedData])


  return (
    <div>
      <div className='d-flex justify-content-between'>
        <span className='fs-3 fw-bold'>Úspěšnost cvičení</span>
        <div className='text-end fs-4'>
          <span className='badge text-bg-primary fw-normal me-1'>{getNameByShortcut(examType)}</span>
          <span className='badge text-bg-primary fw-normal'>{getNameByShortcut(subject)}</span>
        </div>
      </div>
      <div>
        <canvas ref={chartCanvas}></canvas>
      </div>
    </div>
  )
}

export default CviceniPrehledPage