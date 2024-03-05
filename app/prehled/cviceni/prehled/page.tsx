"use client"
import { supabase } from '@/api'
import { useUser } from '@/app/UserContext'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const CviceniPrehledPage = () => {
  const [data, setData] = useState();
  const { userData } = useUser();
  const searchParams = useSearchParams();
  const examType = searchParams.get('zkouska');
  const subject = searchParams.get('predmet');

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
  }, [userData])
  return (
    <div>{JSON.stringify(data)}
    
    </div>
  )
}

export default CviceniPrehledPage