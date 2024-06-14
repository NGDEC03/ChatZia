import React, { useState } from 'react';
import App from './App.jsx';
import axios from 'axios'
function Login() {
  const [isLoggedIn, setLogin] = useState(false);
  const [userName, setName] = useState("");

  return (
    <div className='flex justify-center items-center h-screen'>
      {isLoggedIn ? (
        <App userName={userName} />
      ) : (
        <form className="border-2 border-black p-4"onSubmit={async (e) => {
          e.preventDefault();
          const resp=await axios.post("http://localhost:3000/registerUser",{userName})
          // console.log(resp.data.userName);
          alert(resp.data.message)
          setTimeout(()=>{setLogin(true)},300)
          
        }}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={userName}
            placeholder='Enter Your Name'
            className=' placeholder: font-poppins font-Poppins bg-zinc-800 rounded-lg p-2 text-white'
          />
          
        </form>
      )}
    </div>
  );
}

export default Login;
