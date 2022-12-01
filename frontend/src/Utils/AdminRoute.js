import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AppContext from '../Context/AppContext'

function AdminRoute() {
    let {user} = useContext(AppContext);
  return (
    user&&user.is_super_admin?<Outlet/>:<Navigate replace to='/login/' />
  )
}

export default AdminRoute