import React, { useState } from 'react';
import StudentLayout from '../Student/studentLayout';
import ReactMarkdown from 'react-markdown';

const TypingIndicator = () => (
  <div className="flex items-center space-x-2">
    <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
    <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce200"></div>
    <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce400"></div>
  </div>
);

const Edubot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Display user's message
    setMessages([...messages, { text: input, type: 'user' }]);
    setInput('');
    setLoading(true);

    // Simulate typing
    setTyping(true);
    setTimeout(async () => {
      // Simulate a delay for the bot's response
      const response = await fetch('http://localhost/api/chat/edubot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      setMessages([...messages, { text: input, type: 'user' }, { text: data.response, type: 'EduBot' }]);
      setLoading(false);
      setTyping(false);
    }, 1000); // Adjust delay to simulate typing time
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <StudentLayout>
      <div className="flex flex-col sm:w-screen h-screen max-w-4xl mx-auto bg-gray-50">
        <header className="bg-blue-600 text-white p-4 text-center shadow-md">
          <h1 className="text-3xl font-semibold">Edubot</h1>
        </header>
        <main className="flex-1 p-4 overflow-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`p-3 rounded-lg max-w-xs ${msg.type === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-300 text-gray-700 self-start mr-auto'}`}>
                {msg.type !== 'user' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      EB
                    </div>
                    <p className="text-gray-600 font-semibold">Edubot:</p>
                  </div>
                )}
                {/* Render bot message with markdown */}
                {msg.type === 'EduBot' ? (
                  <ReactMarkdown className="prose">
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex items-center space-x-2 text-gray-500">
                <TypingIndicator />
                <p>Typing...</p>
              </div>
            )}
          </div>
        </main>
        <footer className="p-4 bg-gray-200 border-t border-gray-300">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </StudentLayout>
  );
}

export default Edubot;
