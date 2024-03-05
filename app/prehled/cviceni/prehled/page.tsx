"use client"
import { useSearchParams } from 'next/navigation'
const CviceniPrehledPage = () => {
  const searchParams = useSearchParams();
  const examType = searchParams.get('zkouska');
  const subject = searchParams.get('predmet');
  return (
    <div>{examType},{subject}</div>
  )
}

export default CviceniPrehledPage