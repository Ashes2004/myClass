import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
const PerformanceAnalysisLayout = ({children}) => {
  return (
    <div className='h-full bg-cream'>
        <header className='p-3 flex bg-violet-600 items-center shadow-md shadow-violet-400'>
        <div className='w-1/12'>
        <Link href="/student/leaderboard" className='invert'><ArrowLeftIcon width="20" height="20"/></Link>
        </div>
        <p className='text-center w-10/12 text-white font-semibold text-md md:font-bold tracking-wide md:text-xl'>Performance Analysis</p>
      </header>
        <div className='m-3 p-1'>
            {children}
        </div>
    </div>
  )
}

export default PerformanceAnalysisLayout