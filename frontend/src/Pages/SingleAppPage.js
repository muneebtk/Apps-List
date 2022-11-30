import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Sidebar from '../Components/Sidebar/Sidebar'
import SingleApp from '../Components/SingleApp/SingleApp'

function SingleAppPage() {
  return (
    <div>
        <NavBar/>
        <div style={{display:'flex'}}>
        <Sidebar/>
        <SingleApp/>
        </div>
    </div>
  )
}

export default SingleAppPage