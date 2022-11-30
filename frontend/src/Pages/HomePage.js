import React from 'react'
import Home from '../Components/Home/Home'
import NavBar from '../Components/NavBar/NavBar'
import Sidebar from '../Components/Sidebar/Sidebar'

function HomePage() {
  return (
    <>
    <NavBar/>
    <div style={{display:'flex'}}>
          <Sidebar/>
        <Home/>
    </div>
    </>
  )
}

export default HomePage