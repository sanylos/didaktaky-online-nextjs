// @ts-nocheck
"use client"
import { supabase } from '@/api'
import { useUser } from '@/app/UserContext'
import { unique } from 'next/dist/build/utils'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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

    setGroupedData({ labels: uniqueLabels, correctCounts: correctGroup, incorrectCounts: incorrectGroup })
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

  return (
    <div>{JSON.stringify(data)}
      {JSON.stringify(groupedData)}
    </div>
  )
}

export default CviceniPrehledPage