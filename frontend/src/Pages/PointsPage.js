import React from 'react'
import Points from '../Components/Points/Points'
import Sidebar from '../Components/Sidebar/Sidebar'
import NavBar from '../Components/NavBar/NavBar'
function PointsPage() {
  return (
    <div>
        <NavBar/>
        <div style={{display:'flex'}}>
            <Sidebar/>
            <Points/>
        </div>
    </div>
  )
}

export default PointsPage