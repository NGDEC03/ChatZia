import React, { useState } from 'react';
import Image0 from './brightness.png';
import Image1 from './dark-mode.png';

function App(props) {
  const [arr, setArr] = useState([]);
  const [message, setMessage] = useState('');
  const [iconSrc, setIconSrc] = useState(Image0);
  const [bgColor,setBGColor]=useState("black")
  const [textColor,setTextColor]=useState("white")
  function buildMessage(e) {
    setMessage(e.target.value);
  }

  function showMessage() {
    setArr([...arr, message]);
    setMessage('');
  }

  function SwitchMode() {
    setIconSrc(prevSrc => (prevSrc === Image0 ? Image1 : Image0));
    setBGColor(prev=>prev==="black"?"white":"black")
    setTextColor(prev=>prev==="white"?"black":"white")
  }

  return (
    <>
      <div className={`h-screen w-screen bg-${bgColor} flex relative`}>
        <img
          id="icon"
          className={`text-${textColor} bottom-2 absolute top-4 right-2 h-10 w-10`}
          onClick={SwitchMode}
          src={iconSrc}
          alt="icon"
        />
        <div className={`bg-${bgColor} flex flex-col justify-end flex-grow px-4 text-white`}>
          <div className='w-full flex justify-end mr-4 overflow-scroll'>
            <div>
              {arr.map((ele, index) => (
                <div key={index} className={`bg-${textColor} rounded-lg w-40 mt-2 p-2 font-extralight`}>
                  <p className={`text-${bgColor} font-Poppins font-semibold relative left-[75%] inline`}>{props.userName}:</p>
                  <p className={`text-${bgColor} break-words font-Poppins`}>{arr[arr.length - 1 - index]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='h-8'></div>
          <input
            onChange={buildMessage}
            value={message}
            className="mb-2 p-1 text-white bg-gray-700 rounded placeholder:font-Poppins"
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
