"use client"
import { arrow_back } from '@/public/Icons'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
const QuizLayout = ({children}) => {
  return (
    <>
        <header className='bg-violet-600 sticky top-0 px-3 py-3 shadow-md shadow-violet-400 grid grid-cols-12 align-middle'>
            <Link href="/student" className='col-span-2 flex'><Image src={arrow_back} width={24} height={24} className='invert' alt='back-arrow'/></Link>
            <p className='text-center col-span-8 md:text-2xl font-bold text-white text-lg'>Quiz</p>
        </header>
        <div className='px-4 mt-3 lg:px-60 xl:px-72 h-full pb-2'>
            {children}
        </div>
    </>
  )
}

export default QuizLayout