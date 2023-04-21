import React, {  useEffect, useContext } from "react";
import { Link} from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

function Navbar() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }
  const username = userInfo?.username;
  return (
     <header className="flex flex-row justify-around  items-center p-5 gap-x-4">
      <Link to="/" className="font-bold text-lg text-pink-700 hover:text-orange-700">asimsafar</Link>
      <nav className="flex flex-row justify-around  items-center p-5 gap-x-4">
        {username && (
          <div className="flex flex-row justify-around  items-center p-5 gap-x-4">
            <Link to="/create" className="bg-orange-700 text-orange-50 h-8  rounded-sm hover:bg-pink-700 flex items-center justify-center">Create new post</Link>
            <a onClick={logout} className="bg-orange-400  text-orange-50 h-8  rounded-sm hover:bg-pink-400 flex items-center justify-center">Logout ({username})</a>
          </div>
        )}
        {!username && (
          <div className="flex flex-row justify-around  items-center p-5 gap-x-4">
            <Link to="/login" className="bg-orange-700 text-orange-50 h-8 w-16 rounded-sm hover:bg-pink-700 flex items-center justify-center">Login</Link>
            <Link to="/register" className="bg-orange-400  text-orange-50 h-8 w-16 rounded-sm hover:bg-pink-400 flex items-center justify-center">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
