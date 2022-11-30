import React, { useContext } from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Sidebar from '../Components/Sidebar/Sidebar'
import UserHome from '../Components/UserHome/UserHome'
import AppContext from '../Context/AppContext'

function UserHomePage() {
    let {user} = useContext(AppContext);
  return (
    <div>
        <NavBar/>
        <div style={{display:'flex'}}>
            <Sidebar/>
            <UserHome/>
        </div>
    </div>
  )
}

export default UserHomePage