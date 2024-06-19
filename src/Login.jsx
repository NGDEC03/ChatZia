import React, { useState } from 'react';
import axios from 'axios';
import App from './App.jsx';
import Untitled from './Untitled.png';

function Login() {
  const [isLoggedIn, setLogin] = useState(false);
  const [userName, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://chatifly-backend.vercel.app/registerUser", { userName });
      // alert(response.data.message);
      setLogin(true);
    } catch (error) {
      setError("Failed to register. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <App userName={userName} />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full"
      >
        
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 font-Poppins font-semibold mb-2">Username</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="font-Poppins bg-gray-200 rounded-lg py-2 px-4 w-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className={`bg-blue-500 text-white font-Poppins rounded-lg py-2 px-4 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Go"}
        </button>
      </form>
    </div>
  );
}

export default Login;
