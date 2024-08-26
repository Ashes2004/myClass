import React from 'react'
import Image from 'next/image'
import { arrow_back, caret_back, caret_forward } from '@/public/Icons'
import AttendanceBar from './AttendanceBar'
import Link from 'next/link'
import { useAttendanceContext } from './attendenceBody'
const AttendanceLayout = ({children}) => {
  const {isOpen,openBodyInSide} = useAttendanceContext();
  const openBody = () => {
    openBodyInSide();
  }
  return (
    <div>
    <header className={`bg-violet-600 p-3 pl-6 text-white flex justify-start items-center gap-3 ${isOpen?'opacity-20':''}`}>
      <Link href={`${isOpen?'':'/teacher'}`}>
       <Image src={arrow_back} width={20} height={20} className='invert'/>
      </Link>
      <span>Back to Teacher Dashboard</span>
    </header>
    <div className="md:flex realtive h-screen bg-cream md:p-4 flex-row-reverse box-border">
        <button onClick={() => openBody()} className={`fixed ${isOpen?'right-[262px]':'right-0'} md:hidden top-1/2 z-50 bg-violet-500 h-10`}><Image src={!isOpen?caret_back:caret_forward} width={20} height={24} className='invert'/></button>
        <AttendanceBar />
        <div className='w-full pl-3 pr-3'>
          {children}
          </div>
     </div>
     </div>
  )
}
export default AttendanceLayout