import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
const {setUserInfo} =useContext(UserContext)
  async function login(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.status === 200) {
       response.json().then(userInfo =>{
        setUserInfo(userInfo)
        setRedirect(true)
       })
      } else {
        alert('Username or password invalid');
      }
    } catch (error) {
      console.error(error);
      alert('Dont work login page');
    }
  }

  if (redirect) {
    return <Navigate to='/' />
  }

  return (
    <form
      className="flex flex-col justify-center items-center gap-y-5"
      onSubmit={login}
    >
      <h1 className="text-3xl font-bold">Login</h1>
      <input
        className="shadow appearance-none border rounded w-1/2 py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-zinc-900 hover:bg-pink-700 text-white font-bold  w-1/2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

export default LoginPage;
