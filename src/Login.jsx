import React from 'react'
import App from './App.jsx'
import { useState } from 'react'
function Login() {
  const [isLoggedIn,setLogin]=useState(false)
  const [userName,setName]=useState("")
  return (
   <div>
    {isLoggedIn?<App userName={userName}/>:
    <div>
      <form onSubmit={
        (e)=>{
          e.preventDefault();
          setLogin(true)

      }}>
        <input onChange={(e)=>setName(e.target.value)} value={userName} placeholder='Enter Your Name' className='bg-zinc-200'></input>
      </form>
      </div>
    
    
    }
   </div>
  )
}

export default Login;