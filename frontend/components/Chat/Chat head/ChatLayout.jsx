'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { docx_file_icon, pptx_file_icon, sampleProfile, xlsx_file_icon } from '@/public/Images'
import { pdf_fiile_icon, send } from '@/public/Icons'
import { useChat } from './ChatBody'
const ChatLayout = ({children}) => {
  const [replySectionWidth, setReplySectionWidth] = useState(0);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState('');
  const [message, setMessage] = useState('');
  const {profile, isConnected, sendMessage} = useChat();
  useEffect(() => {
    const getReplySectionWidth = () => {
      if(window.innerWidth <= 1024) return window.innerWidth * (4/10);
      return window.innerWidth * (6/10);
    }
    setReplySectionWidth(getReplySectionWidth());
  },[])
  const handleFiles = (e) => {
    const File = e.target.files[0];
    console.log(File)
    console.log(e);
    setFile(e.target.files[0]);
    console.log(File?.name.split(".")[1])
    if(File){
      if(File?.name.split(".")[1]==="pdf") setFileURL(pdf_fiile_icon);
      else if(File?.name.split(".")[1]==="xlsx") setFileURL(xlsx_file_icon);
      else if(File?.name.split(".")[1]==="pptx") setFileURL(pptx_file_icon);
      else if(File?.name.split(".")[1]==="docx") setFileURL(docx_file_icon);
      else {
        const url = URL.createObjectURL(File);
        setFileURL(url);
      }
    }
  };
  const sendFile = () => {
    setFile(null);
  };
  const cancelSendFile = () => {
    setFile(null);
  }
  const sendMessageWithPayload = () => {
    const now = new Date();  
    const hours = now.getHours();  
    const minutes = now.getMinutes();  
    const currTime = `${hours}:${minutes}`;
    const msg = {
      _id:Math.random(),
      message:message,
      room:profile.room,
      timeStamp:currTime
    };
    sendMessage(msg);
  }
  return (
    <>
      <div className='w-full bg-slate-200 text-slate-900 h-16 flex justify-between items-center px-6'>
        <div className='flex items-center gap-3'>
          <Image src={sampleProfile} width={50} height={20} alt='profile-pricture'/>
          <div className='flex flex-col gap-1'>
            <p className='font-medium'>Supratim Das</p>
            <div className='flex gap-1 items-center'>
              <div className={`w-3 h-3 ${isConnected?'bg-green-400':'bg-red-500'} rounded-full`}></div>
              <p className='text-gray-700 font-semibold text-[14px]'>{isConnected?'Online':'Offline'}</p>
            </div>
          </div>
        </div>
        <button className='px-3 py-2 rounded-full border-2 bg-[#F0F0F0] border-[#ccc] text-[#008080]'>View Profile</button>
      </div>
      <div>{children}</div>
      <div className='w-full h-14 fixed bottom-0 bg-slate-200 flex items-center gap-3 px-6'>
        <div className='relative'>
          <label htmlFor='fileUpload' className='text-[#008080] px-3 py-1 border rounded-full border-[#ccc] bg-[#F0F0F0] cursor-pointer'>
           Upload files
          </label>
          <input type="file" id='fileUpload' className='hidden' onChange={handleFiles}/>
          <div className={`${file?'block':'hidden'} absolute -top-[340px] text-gray-100 bg-gray-600 rounded-lg shadow-gray-400 shadow-xl h-80 w-80 flex flex-col`}>
            <div className='h-52 w-66  mx-5 my-1 flex items-center justify-center overflow-y-auto'>
              {fileURL && <Image src={fileURL} width={180} height={180} alt='file-to-be-uploaded' className='w-[150px] h-[150px]'/>}
            </div>
            {file && <p className='overflow-hidden h-[21px] text-center mx-5 text-gray-300 text-[14px]'>{file?.name}</p>}
            {file && <p className='text-center text-gray-300 mx-5 text-[14px]'>{file?.size>1024?Number(file?.size/1024).toFixed(2):file?.size} {((file?.size)/1024)>1?'KB':'B'}</p>}
            <div className='flex gap-3 justify-center items-center'>
            <button onClick={cancelSendFile} className='px-2.5 py-1.5 mt-3 bg-white text-red-500 border-2 border-red-500 font-semibold tracking-wide rounded-md flex justify-center items-center gap-3'>
              <p>Cancel</p>
            </button>
            <button onClick={sendFile} className='px-2.5 py-1.5 mt-3 bg-green-400 text-white font-semibold tracking-wide rounded-md flex justify-center items-center gap-3'>
              <p>Send</p>
              <Image src={send} width={16} height={16} alt='file-send-button' className='invert'/>
            </button>
            </div>
          </div>
        </div>
        <div className='bg-gray-300 rounded-full px-3 py-2 text-[14px] flex items-center justify-between' style={{width:replySectionWidth}}>
          <input onChange={e => setMessage(e.target.value)} value={message} className='w-5/6 bg-transparent outline-none placeholder:text-gray-600 text-gray-600' placeholder='type here'/>
          <button onClick={sendMessageWithPayload} className='rounded-full w-[30px] h-[30px] flex justify-center items-center bg-green-400'><Image src={send} width={18} height={18} alt='send' className=''/></button>
        </div>
      </div>
    </>
  )
}

export default ChatLayout