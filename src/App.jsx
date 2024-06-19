import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Image0 from './brightness.png';
import Image1 from './dark-mode.png';

function App({ userName }) {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const iconSrc = isDarkMode ? Image0 : Image1;
  const [times, setTimes] = useState([]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.post("https://chatifly-backend.vercel.app/fetchMessage");
      const data = response.data.reverse();

      const fetchedMessages = data.map(item => item.message);
      const fetchedTimes = data.map(item => item.sentAt);
      const fetchedUserNames = data.map(item => item.userName);

      setChats(fetchedMessages);
      setTimes(fetchedTimes);
      setUserNames(fetchedUserNames);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const buildMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const newMessage = {
      message,
      userName,
      sentAt: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    try {
      const response = await axios.post("https://chatifly-backend.vercel.app/setMessage", newMessage);
      if (response.status === 200) {
        setChats(prevChats => [newMessage.message, ...prevChats]);
        setTimes(prevTimes => [newMessage.sentAt, ...prevTimes]);
        setUserNames(prevUserNames => [newMessage.userName, ...prevUserNames]);
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`h-screen w-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Header */}
      <div className={`p-4 flex items-center justify-between ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <h1 className="text-xl font-semibold font-Poppins">Chat Application</h1>
        <img
          id="icon"
          className="h-8 w-8 cursor-pointer"
          onClick={toggleDarkMode}
          src={iconSrc}
          alt="Toggle dark mode"
        />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {chats.map((ele, index) => (
          <div key={index} className={` relative mb-4 ${userName !== userNames[index] ? 'ml-auto' : ''} `}>
            <div className={` w-40 break-words p-4 rounded-lg ${userName !== userNames[index] ? 
                (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800') : 
                (isDarkMode ? 'bg-blue-500 text-white' : 'bg-black text-white')}`}>
              <p className="text-sm font-bold font-Poppins mb-2">{userNames[index]}</p>
              <p className="text-base font-thin font-Poppins">{ele}</p>
              <p className="text-xs text-right font-Poppins">{times[index]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="flex items-center">
          <input
            onChange={buildMessage}
            onKeyDown={handleKeyDown}
            value={message}
            className={`flex-1 p-2 mr-2 rounded font-Poppins ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'}`}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className={`px-4 py-2 rounded font-Poppins ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
