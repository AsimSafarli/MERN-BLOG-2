import React from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router';

function RegisterPage() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [redirect,setRedirect] = useState(false);
  async function register(e){
    e.preventDefault();
    await fetch('http://localhost:4000/register',{
     method:'POST',
     body:JSON.stringify({
      username,password
     }),
     headers:{'Content-Type':'application/json'},
    });
    if (register.status===200) {
     alert('Register succesfully')
    } else {
      alert('Registration failed. Please try again.');
    }
  }
 
  return (
    <form className=" flex flex-col justify-center items-center gap-y-5" onSubmit={register} >
    <h1 className="text-3xl font-bold">Register</h1>
    <input
      className="shadow appearance-none border rounded w-1/2 py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="Username"
     value={username}
     onChange={e=>setUsername(e.target.value)}
    />

    <input
      className="shadow appearance-none border  rounded w-1/2 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      type="password"
      placeholder="password"
     value={password}
     onChange={e=>setPassword(e.target.value)}
    />
   
    <button
      className="bg-zinc-900 hover:bg-orange-700 text-white font-bold  w-1/2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Register
    </button>
    {/* <ToastContainer /> */}
  </form>
  )
}

export default RegisterPage
