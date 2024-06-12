import React from 'react';
import {useState} from 'react'
function App(props) {
  
  const [arr,setArr]=useState([])
  const [message,setMessage]=useState("")
  function buildMessage(e){
    setMessage(e.target.value)
  }
  function showMessage(e){
    setArr([...arr,message])
    setMessage("")
  }
  return (
    <>
      <div className='h-screen w-screen bg-slate-900 flex'>
        <div className='bg-black flex flex-col justify-end flex-grow px-4'>
          <div className='w-full flex justify-end mr-4'>
            <div>
              {arr.map((ele, index) =>
                <div key={index} className='bg-zinc-200 rounded-lg w-40 mt-2 p-2 font-extralight'>
                  <p>{props.userName}:</p>
                  <p>{arr[arr.length-1-index]}</p>
                </div>
              )}
            </div>
          </div>
          <div className='h-8'></div>
          <input onChange={buildMessage} value={message} className="mb-2 p-1 text-white bg-gray-700 rounded" placeholder="Type something..." />
          <input onClick={showMessage}type='submit' className="p-1 text-white bg-blue-500 rounded cursor-pointer" value="Submit" />
        </div>
      </div>
    </>
  );
}

export default App;
