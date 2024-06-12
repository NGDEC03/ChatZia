import React, { useState } from 'react';
import App from './App.jsx';

function Login() {
  const [isLoggedIn, setLogin] = useState(false);
  const [userName, setName] = useState("");

  return (
    <div className='flex justify-center items-center h-screen'>
      {isLoggedIn ? (
        <App userName={userName} />
      ) : (
        <form className="border-2 border-black p-4"onSubmit={(e) => {
          e.preventDefault();
          setLogin(true);
        }}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={userName}
            placeholder='Enter Your Name'
            className='bg-zinc-800 rounded-lg p-2'
          />
        </form>
      )}
    </div>
  );
}

export default Login;
