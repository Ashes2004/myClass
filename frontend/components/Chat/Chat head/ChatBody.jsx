"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import ChatLayout from './ChatLayout'
import Image from 'next/image'
import { double_check } from '@/public/Images';
import { socket } from '@/socket/socket_io';

const ChatBody = ({profile}) => {
  const [chatSectionHeight, setChatSectionHeight] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    const getChatSectionHeight = () => {
      return(window.innerHeight -(72+64));
    };
    setChatSectionHeight(getChatSectionHeight());

    if (socket.connected) {
      onConnect();
    }

    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
    }

    const recieveMessage = (msg) => {
      setMessages(messages => [...messages,msg]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("recieve message", recieveMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  },[])
  const sendMessage = (msg) => {
    socket.emit('chat message',msg);
  }
  return (
    <chatUserContext.Provider value={{profile,isConnected,transport,sendMessage}}>
    <ChatLayout>
        <div className='flex flex-col gap-3 bg-gradient-to-br from-gray-500 to-gray-200 p-3 text-gray-800 overflow-y-scroll text-[14px]' style={{height:chatSectionHeight}}>
          <div className="flex justify-start mb-4">
            <div className="bg-white text-gray-900 p-4 rounded-lg max-w-md relative">
              <p className='-mt-3 mb-1'>Sir, I have a few doubts in Force chapter</p>
              <p className="text-xs text-gray-500 absolute bottom-1 right-2 flex items-center gap-1"><span>9:30</span></p>
            </div>
          </div>
          <div className="flex justify-start mb-4">
            <div className="bg-white text-gray-900 p-4 rounded-lg max-w-md relative">
              <p className='-mt-3 mb-1'>What are the equation of Newton's Law?</p>
              <p className="text-xs text-gray-500 absolute bottom-1 right-2 flex items-center gap-1"><span>9:30</span></p>
            </div>
          </div>
          <div className="flex justify-end mb-4">
            <div className="bg-white text-gray-900 p-4 rounded-lg max-w-md relative">
              <p className='-mt-3 mb-1'>Newton's first law states that every object will remain at rest or in uniform motion in a straight line unless compelled to change its state by the action of an external force.</p>
              <p className="text-xs text-gray-500 absolute bottom-1 right-2 flex items-center gap-1"><span>10:30</span> <Image src={double_check} width={20} height={20} alt='double-check'/></p>
            </div>
          </div>
          {messages.map(msg => (<div key={msg.id} className={`flex ${msg.room!==socket.id?'justify-end':'justify-start'} mb-4`}>
            <div className="bg-white text-gray-900 p-4 rounded-lg max-w-md relative">
              <p className='-mt-3 mb-1'>{msg.message}</p>
              <p className="text-xs text-gray-500 absolute bottom-1 right-2 flex items-center gap-1"><span>{msg.timeStamp}</span> <Image src={double_check} width={20} height={20} alt='double-check'/></p>
            </div>
          </div>))}
        </div>
    </ChatLayout>
    </chatUserContext.Provider>
  )
}

export default ChatBody

export const chatUserContext = createContext();

export const useChat = () => useContext(chatUserContext);