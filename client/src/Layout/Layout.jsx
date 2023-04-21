import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
function Layout(props) {
  return (
    <main className='flex flex-col gap-y-5'>
      <Navbar />
      <Outlet />
      <Footer/>
    </main>
  )
}

export default Layout
