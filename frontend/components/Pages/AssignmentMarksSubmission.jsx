"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { arrow_back, caret_forward, send } from '@/public/Icons'
import Link from 'next/link'
import { filter, grayClock, grayDocuments } from '@/public/Images'
const AssignmentMarksSubmission = () => {
    const [marks, setMarks] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isMarksVisible, setIsMarksVisible] = useState([]);
    const [allVisible, setAllVisible] = useState(false);
    const [markedVisible, setMarkedVisible] = useState(false);
    const [unmarkedVisible, setUnmarkedVisible] = useState(true);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [submittedAssignments, setSubmittedAssignments] = useState([
        {
            id:1,
            name:"",
            roll:'13000222081',
            section:'B',
            documentTopic:'Difference Between List & ArrayList',
            dateOfSubmission:'28 Aug 2024',
            documentType:'pdf',
            noOfPages:8,
            marksSubmissionStatus:'Pending',
            marks:0,
            department:'IT'
        },
        {
            id:2,
            name:"",
            roll:'13000222052',
            section:'A',
            documentTopic:'Difference Between Abstract Class & Interface',
            dateOfSubmission:'27 Aug 2024',
            documentType:'ppt',
            noOfPages:10,
            marksSubmissionStatus:'Pending',
            marks:0,
            department:'IT'
        }
    ])
    useEffect(() => {
        setUnmarkedVisible(true);
    },[submittedAssignments])
    const submitMarks = (roll) => {
        console.log(marks);
        setIsSubmitted(true);
        setSubmittedAssignments(submittedAssignments.map(assignment => {
            if(assignment.roll === roll) return {...assignment,marks:marks,marksSubmissionStatus:'Submitted'};
            else return assignment;
        }))
        setMarks(0);
    }
    const showAll = (e) => {
        if(e.target.checked){
            setMarkedVisible(false);
            setUnmarkedVisible(false);
            setAllVisible(true);
        }
        else setAllVisible(false);
    }
    const showMarked = (e) => {
        if(e.target.checked){
            setMarkedVisible(true);
            setUnmarkedVisible(false);
            setAllVisible(false);
        }
        else setIsMarksVisible(false);
    }
    const showUnmarked = (e) => {
        if(e.target.checked){
            setMarkedVisible(false);
            setUnmarkedVisible(true);
            setAllVisible(false);
        }
        else
            setUnmarkedVisible(false);    
    }
  return (
    <div className=''>
        <header className='w-full fixed top-0 bg-violet-600 py-3 px-6 grid grid-cols-12'>
            <Link href="/teacher" className='flex'><Image src={arrow_back} width={24} height={24} alt='back arrow' className='invert'></Image></Link>
            <p className='text-md md:text-xl font-bold text-white col-span-10 text-center tracking-wider'>Assignment</p>
        </header>
        <div className='md:hidden mt-14 px-5 bg-cream text-black flex justify-end gap-3'>
            <p className={`text-[12px] font-medium ${isNavbarVisible?'hidden':'visible'}`}>FILTER BY</p>
            <button onClick={()=>setIsNavbarVisible(!isNavbarVisible)}><Image src={!isNavbarVisible?filter:caret_forward} width={16} height={16} alt='filter'/></button>
        </div>
        <nav className={`md:block ${isNavbarVisible?'block':'hidden'} fixed md:left-8 top-20 right-3 z-50 w-56 rounded-t-md shadow-xl`}>
            <p className=' rounded-t-md border-2 bg-violet-500 text-white border-b-white border-t-transparent border-r-transparent border-l-transparent px-6 pt-6 pb-1'>FILTER BY</p>
            <div className='flex gap-1 items-center px-6 pt-3 bg-white'>
                <input type='checkbox' id='all' className='w-4 h-4' onChange={showAll} checked={allVisible}></input>
                <label htmlFor='all' className='text-[14px] font-medium tracking-wide'>ALL</label>
            </div>
            <div className='flex gap-1 items-center px-6 py-3 bg-white'>
                <input type='checkbox' id='marked' className='w-4 h-4' onChange={showMarked} checked={markedVisible}></input>
                <label htmlFor='marked' className='text-[14px] font-medium tracking-wide'>MARKED</label>
            </div>
            <div className='flex gap-1 items-center px-6 pb-6 bg-white'>
                <input type='checkbox' id='unmarked' className='w-4 h-4' onChange={showUnmarked} checked={unmarkedVisible}></input>
                <label htmlFor='unmarked' className='text-[14px] font-medium tracking-wide'>UNMARKED</label>
            </div>
        </nav>
        <div className={`md:mt-[68px] md:mx-72 px-3 py-3 rounded-md ${isNavbarVisible?'blur-sm':''}`}>
            <select className='w-full mb-2 appearance-none outline-violet-500 border-violet-300 border-2 rounded-md px-3 p-1 font-semibold'>
                <option selected>-- Choose a class --</option>   
                <option value="9">Class 9</option>
                <option value="8">Class 8</option>
                <option value="7">Class 7</option>
                <option value="6">Class 6</option>
                <option value="5">Class 5</option>
            </select>
            {submittedAssignments.map((assignment) =>{if(unmarkedVisible) {return assignment.marksSubmissionStatus==='Pending'?<div key={assignment.id} className={`bg-white md:p-3 mb-3 rounded-md grid grid-rows-2 md:grid-rows-4 grid-cols-5 gap-1 shadow-xl`}>
                <div className='col-span-2 md:col-span-1 row-span-1 md:row-span-3 flex justify-center items-center'>
                    <Link href="#" className={`rounded-full shadow-lg ${assignment.documentType==="pdf"?'bg-red-500':''} ${assignment.documentType==="ppt"?'bg-yellow-400':''} text-white text-center text-2xl md:text-4xl w-16 h-16 md:w-24 md:h-24 flex justify-center items-center`}><p className='overflow-hidden text-ellipsis'>{assignment.documentType.toUpperCase()}</p></Link>
                </div>
                <div className='col-span-3 row-span-1 md:row-span-3 gap-1 flex flex-col justify-center md:justify-normal p-3'>
                    <p className='text-sm md:text-lg font-semibold tracking-wide'>{assignment.documentTopic}</p>
                    <p className='text-sm font-normal text-gray-400'>{assignment.roll} {assignment.department} {assignment.section}</p>
                </div>
                <div className={`${assignment.marksSubmissionStatus==="Pending"?'visible':'hidden'} col-span-5 md:col-span-1 row-span-1 md:row-span-3 ${assignment.documentType==="pdf"?'border-t-red-500':''} ${assignment.documentType==="ppt"?'border-t-yellow-400':''}  border-b-transparent border-r-transparent border-l-transparent border md:border-none mx-6 md:mx-0 p-3 flex justify-evenly items-center`}>
                    <input onChange={e => setMarks(e.target.value)} placeholder='' type='number' className={`text-center border-2 ${assignment.documentType==="pdf"?'border-red-500':''} ${assignment.documentType==="ppt"?'border-yellow-400':''} rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none w-[50px] h-[50px] `}></input>
                    <button onClick={()=>submitMarks(assignment.roll)} className={`flex justify-center items-center p-2  ${assignment.documentType==="pdf"?'bg-red-500':''} ${assignment.documentType==="ppt"?'bg-yellow-400':''} rounded-full`}><Image src={send} width={24} height={24} alt='send button' className='invert'/></button>
                </div>
                <div className={`${assignment.marksSubmissionStatus==="Submitted"?'visible':'hidden'} col-span-5 md:col-span-1 row-span-1 md:row-span-3 ${assignment.documentType==="pdf"?'border-red-500':''} ${assignment.documentType==="ppt"?'border-yellow-400':''} border-b-transparent border-r-transparent border-l-transparent border md:border-none mx-6 md:mx-0 p-3 flex justify-evenly items-center`}>
                    <button  className={`${assignment.documentType==="pdf"?'bg-red-500':''} ${assignment.documentType==="ppt"?'bg-yellow-400':''} px-3 py-2 rounded-md text-white font-semibold tracking-wide`}>{assignment.marks}</button>
                </div>
                <div className='col-span-5 row-span-1 hidden md:flex gap-3 mt-2'>
                    <div className='w-1/2 flex items-center px-6'>
                        <Image src={grayClock} width={14} height={14} alt='clock' />
                        <p className='text-gray-400 text-[13px] font-normal mx-1.5 '>Submitted on {assignment.dateOfSubmission}</p>
                    </div>
                    <div className='w-1/2 flex items-center px-6 justify-end'>
                        <Image src={grayDocuments} width={16} height={16} alt='number of pages'/>
                        <p className='text-gray-400 text-[13px] font-normal mx-1.5 '>{assignment.noOfPages} Pages</p>
                    </div>
                </div>
            </div>:''};
            if(markedVisible) {return assignment.marksSubmissionStatus ==='Submitted'?<div key={assignment.id} className={`bg-white md:p-3 mb-3 rounded-md grid grid-rows-2 md:grid-rows-4 grid-cols-5 gap-1 shadow-xl`}>
            <div className='col-span-2 md:col-span-1 row-span-1 md:row-span-3 flex justify-center items-center'>
                <Link href="#" className={`rounded-full shadow-lg ${assignment.documentType==="pdf"?'bg-red-500':''} ${assignment.documentType==="ppt"?'bg-yellow-400':''} text-white text-center text-2xl md:text-4xl w-16 h-16 md:w-24 md:h-24 flex justify-center items-center`}><p className='overflow-hidden text-ellipsis'>{assignment.documentType.toUpperCase()}</p></Link>
            </div>
            <div className='col-span-3 row-span-1 md:row-span-3 gap-1 flex flex-col justify-center md:justify-normal p-3'>
                <p className='text-sm md:text-lg font-semibold tracking-wide'>{assignment.documentTopic}</p>
                <p className='text-sm font-normal text-gray-400'>{assignment.roll} {assignment.department} {assignment.section}</p>
            </div>
            <div className={`${assignment.marksSubmissionStatus==="Pending"?'visible':'hidden'} col-span-5 md:col-span-1 row-span-1 md:row-span-3 ${assignment.documentType==="pdf"?'border-t-red-500':''} ${assignment.documentType==="ppt"?'border-t-yellow-400':''}  border-b-transparent border-r-transparent border-l-transparent border md:border-none mx-6 md:mx-0 p-3 flex justify-evenly items-center`}>
                <input onChange={e => setMarks(e.target.value)} placeholder='' type='number' className={`text-center border-2 ${assignment.documentType==="pdf"?'border-red-500':''} ${assignment.documentType==="ppt"?'border-yellow-400':''} rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none w-[50px] h-[50px] `}></input>
                <button onClick={()=>submitMarks(assignment.roll)} className={`flex justify-center items-center p-2  ${assignment.documentType==="pdf"?'bg-red-500':''} ${assignment.documentType==="ppt"?'bg-yellow-400':''} rounded-full`}><Image src={send} width={24} height={24} alt='send button' className='invert'/></button>
            </div>
            <div className={`${assignment.marksSubmissionStatus==="Submitted"?'visible':'hidden'} col-span-5 md:col-span-1 row-span-1 md:row-span-3 ${assignment.documentType==="pdf"?'border-red-500':''} ${assignment.documentType==="ppt"?'border-yellow-400':''} border-b-transparent border-r-transparent border-l-transparent border md:border-none mx-6 md:mx-0 p-3 flex justify-evenly items-center`}>
                <button  className={`${assignment.documentType==="pdf"?'bg-red-500':''} ${assignment.documentType==="ppt"?'bg-yellow-400':''} px-3 py-2 rounded-md text-white font-semibold tracking-wide`}>{assignment.marks}</button>
            </div>
            <div className='col-span-5 row-span-1 hidden md:flex gap-3 mt-2'>
                <div className='w-1/2 flex items-center px-6'>
                    <Image src={grayClock} width={14} height={14} alt='clock' />
                    <p className='text-gray-400 text-[13px] font-normal mx-1.5 '>Submitted on {assignment.dateOfSubmission}</p>
                </div>
                <div className='w-1/2 flex items-center px-6 justify-end'>
                    <Image src={grayDocuments} width={16} height={16} alt='number of pages'/>
                    <p className='text-gray-400 text-[13px] font-normal mx-1.5 '>{assignment.noOfPages} Pages</p>
                </div>
            </div>
        </div>:''};
        if(allVisible) {return <div key={assignment.id} className={`bg-white md:p-3 mb-3 rounded-md grid grid-rows-2 md:grid-rows-4 grid-cols-5 gap-1 shadow-xl`}>
        <div className='col-span-2 md:col-span-1 row-span-1 md:row-span-3 flex justify-center items-center'>
            <Link href="#" className={`rounded-full shadow-lg ${assignment.documentType==="pdf"?'bg-red-500':''} ${assignment.documentType==="ppt"?'bg-yellow-400':''} text-white text-center text-2xl md:text-4xl w-16 h-16 md:w-24 md:h-24 flex justify-center items-center`}><p className='overflow-hidden text-ellipsis'>{assignment.documentType.toUpperCase()}</p></Link>
        </div>
        <div className='col-span-3 row-span-1 md:row-span-3 gap-1 flex flex-col justify-center md:justify-normal p-3'>
            <p className='text-sm md:text-lg font-semibold tracking-wide'>{assignment.documentTopic}</p>
            <p className='text-sm font-normal text-gray-400'>{assignment.roll} {assignment.department} {assignment.section}</p>
        </div>
        <div className={`${assignment.marksSubmissionStatus==="Pending"?'visible':'hidden'} col-span-5 md:col-span-1 row-span-1 md:row-span-3 ${assignment.documentType==="pdf"?'border-t-red-500':''} ${assignment.documentType==="ppt"?'border-t-yellow-400':''}  border-b-transparent border-r-transparent border-l-transparent border md:border-none mx-6 md:mx-0 p-3 flex justify-evenly items-center`}>
            <input onChange={e => setMarks(e.target.value)} placeholder='' type='number' className={`text-center border-2 ${assignment.documentType==="pdf"?'border-red-500':''} ${assignment.documentType==="ppt"?'border-yellow-400':''} rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none w-[50px] h-[50px] `}></input>
            <button onClick={()=>submitMarks(assignment.roll)} className={`flex justify-center items-center p-2  ${assignment.documentType==="pdf"?'bg-red-500':''} ${assignment.documentType==="ppt"?'bg-yellow-400':''} rounded-full`}><Image src={send} width={24} height={24} alt='send button' className='invert'/></button>
        </div>
        <div className={`${assignment.marksSubmissionStatus==="Submitted"?'visible':'hidden'} col-span-5 md:col-span-1 row-span-1 md:row-span-3 ${assignment.documentType==="pdf"?'border-red-500':''} ${assignment.documentType==="ppt"?'border-yellow-400':''} border-b-transparent border-r-transparent border-l-transparent border md:border-none mx-6 md:mx-0 p-3 flex justify-evenly items-center`}>
            <button  className={`${assignment.documentType==="pdf"?'bg-red-500':''} ${assignment.documentType==="ppt"?'bg-yellow-400':''} px-3 py-2 rounded-md text-white font-semibold tracking-wide`}>{assignment.marks}</button>
        </div>
        <div className='col-span-5 row-span-1 hidden md:flex gap-3 mt-2'>
            <div className='w-1/2 flex items-center px-6'>
                <Image src={grayClock} width={14} height={14} alt='clock' />
                <p className='text-gray-400 text-[13px] font-normal mx-1.5 '>Submitted on {assignment.dateOfSubmission}</p>
            </div>
            <div className='w-1/2 flex items-center px-6 justify-end'>
                <Image src={grayDocuments} width={16} height={16} alt='number of pages'/>
                <p className='text-gray-400 text-[13px] font-normal mx-1.5 '>{assignment.noOfPages} Pages</p>
            </div>
        </div>
    </div>

        }
        })}
        </div>
    </div>
  )
}

export default AssignmentMarksSubmission