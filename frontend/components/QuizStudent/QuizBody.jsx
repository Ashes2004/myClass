import React, { useState } from 'react'
import QuizLayout from './QuizLayout'
import Link from 'next/link'
const QuizBody = () => {
  const [liveQuiz, setLiveQuiz] = useState([
    {
      id:1,
      name:'Chemistry Quiz',
      Date:'28 Aug 2024 8:00PM',
      marks:25,
      duration:'40 Mins'
    }
  ]);
  const [upcomingQuiz, setCpcomingQuiz]  = useState([
    {
      id:1,
      name:'Chemistry Quiz',
      Date:'28 Aug 2024',
      time:'7:00PM',
      marks:25,
      duration:'40 Mins'
    },
    {
      id:2,
      name:'Physics Quiz',
      Date:'28 Aug 2024',
      time:'8:00PM',
      marks:25,
      duration:'40 Mins'
    },
    {
      id:3,
      name:'Mathematics Quiz',
      Date:'29 Aug 2024',
      time:'7:00PM',
      marks:25,
      duration:'40 Mins'
    }
  ]);
  const [pastQuiz, setPastQuiz] = useState([
    {
      id:1,
      name:'Chemistry Quiz',
      status:'Attempted',
      marks:25,
      duration:'40 Mins'
    },
    {
      id:2,
      name:'Physics Quiz',
      status:'Unattempted',
      marks:25,
      duration:'40 Mins'
    },
    {
      id:3,
      name:'Mathematics Quiz',
      status:'Attempted',
      marks:25,
      duration:'40 Mins'
    }
  ]);
  return (
    <QuizLayout>
        <div className='mb-6'>
            <div className='text-2xl lg:text-4xl font-bold  py-2 px-2 text-gray-700'>Live Quizzes</div>
            <div className='p-4 pl-6 md:mt-2 rounded-t-md bg-purple-500 text-white grid grid-cols-4 items-center gap-2 text-[16px]'>
              <p className=''>Name</p>
              <p className='hidden md:block'>Date</p>
              <p className='hidden md:block whitespace-pre'>           Marks</p>
              <p className='hidden md:block'>Duration</p>
            </div>
            {liveQuiz.map(quiz=>(<div key={quiz.id} className='md:p-4 px-2 py-2 grid grid-cols-2 md:grid-rows-1 md:grid-cols-4 items-center gap-1 md:gap-2 border-b-2 border-b-violet-500 bg-slate-100'>
              <p className=''><Link href={`/student/quiz/#`} className='text-blue-600 underline underline-offset-2'>{quiz.name}</Link></p>
              <p className='whitespace-pre font-bold text-red-600 md:text-lg tracking-wide'>  Live</p>
              <p className='whitespace-pre hidden md:block'>             {quiz.marks}</p>
              <p className='hidden md:block'>{quiz.duration}</p>
            </div>))}
        </div>
        <div className='mb-6'>
            <div className='text-2xl lg:text-4xl font-bold  py-2 px-2 text-gray-700'>Upcoming Quizzes</div>
          <div className='p-4 pl-6 md:mt-2 rounded-t-md bg-purple-500 text-white grid grid-cols-4 items-center gap-2 text-[16px]'>
              <p className=''>Name</p>
              <p className='hidden md:block'>Date</p>
              <p className='hidden md:block whitespace-pre'>           Marks</p>
              <p className='hidden md:block'>Duration</p>
            </div>
            {upcomingQuiz.map(quiz =>(<div className='md:p-4 px-2 py-1 grid grid-rows-2 md:grid-rows-1 md:grid-cols-4 items-center gap-1 md:gap-2 border-b-2 border-b-violet-500 bg-slate-100 pb-1'>
              <p className=''><Link href={`/student/quiz/#`} className='text-blue-600 underline underline-offset-2'>{quiz.name}</Link></p>
              <p className='whitespace-pre'>{quiz.Date}   {quiz.time}</p>
              <p className='whitespace-pre hidden md:block'>             {quiz.marks}</p>
              <p className='hidden md:block'>{quiz.duration}</p>
            </div>))}
        </div>
        <div>
        <div className='text-2xl lg:text-4xl font-bold  py-2 px-2 text-gray-700'>Past Quizzes</div>
          <div className='p-4 pl-6 md:mt-2 rounded-t-md bg-purple-500 text-white grid grid-cols-4 items-center gap-2 text-[16px]'>
              <p className=''>Name</p>
              <p className='hidden md:block'>Status</p>
              <p className='hidden md:block whitespace-pre'>           Marks</p>
              <p className='hidden md:block'>Duration</p>
            </div>
            {pastQuiz.map(quiz=>(<div key={quiz.id} className='md:p-4 p-2 grid grid-cols-2  md:grid-rows-1 md:grid-cols-4 items-center gap-8 md:gap-2 border-b-2 border-b-violet-500 bg-slate-100 pb-1'>
              <p className='overflow-hidden h-6'><Link href={`/student/quiz/#`} className='text-blue-600 underline underline-offset-2 '>{quiz.name}</Link></p>
              <p className={`text-white ${quiz.status==='Attempted'?'bg-green-500 w-24 pl-3.5 md:w-28 md:pl-5':'bg-red-500 w-24 pl-2 md:w-28 md:pl-3.5'} rounded-full text-[14px] py-0.5`}>{quiz.status}</p>
              <p className='whitespace-pre hidden md:block'>             {quiz.marks}</p>
              <p className='hidden md:block'>{quiz.duration}</p>
            </div>))}
        </div>
    </QuizLayout>
  )
}

export default QuizBody