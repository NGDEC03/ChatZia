import React, { useState } from 'react';
import Image0 from './brightness.png';
import Image1 from './dark-mode.png';

function App(props) {
  const [arr, setArr] = useState([]);
  const [message, setMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const iconSrc = isDarkMode ? Image0 : Image1;

  function buildMessage(e) {
    setMessage(e.target.value);
  }

  function showMessage() {
    setArr([...arr, message]);
    setMessage('');
  }

  function SwitchMode() {
    setIsDarkMode(prevMode => !prevMode);
  }

  return (
    <>
      <div className={`h-screen w-screen ${isDarkMode ? 'bg-black' : 'bg-white'} flex relative`}>
        <img
          id="icon"
          className={`bottom-2 absolute top-4 left-2 h-10 w-10 cursor-pointer`}
          onClick={SwitchMode}
          src={iconSrc}
          alt="icon"
        />
        <div className={`flex flex-col justify-end flex-grow px-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <div className='w-full flex justify-end mr-4 overflow-scroll'>
            <div>
              {arr.map((ele, index) => (
                <div key={index} className={`rounded-lg w-40 mt-2 p-2 font-extralight ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <p className={`font-Poppins font-semibold relative  inline`}>{props.userName}:</p>
                  <p className={`break-words font-Poppins`}>{arr[arr.length - 1 - index]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='h-8'></div>
          <input
            onChange={buildMessage}
            value={message}
            className={` font-Poppins mb-2 p-1 ${isDarkMode ? 'text-white bg-gray-700' : 'text-black bg-gray-300'} rounded placeholder:font-Poppins ${isDarkMode?'placeholder-white-800':'placeholder-black'}`}
            placeholder={`Type something...`}
          />
          <input
            onClick={showMessage}
            type='submit'
            className="p-1 text-white bg-blue-500 rounded cursor-pointer font-Poppins mb-2"
            value="Submit"
          />
        </div>
      </div>
    </>
  );
}

export default App;
