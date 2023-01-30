import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate } from 'react-router';
import './UserHome.css'
import Header from '../../partials/Header';
import MenuBar from '../../partials/MenuBar';
import useAdminVerify from '../../../hooks/useAdminVerify';
import Spinner from '../../partials/Spinner';

function UserHome() {
  const navigate = useNavigate()
  // const { data, pending } = useAdminVerify()
  // const [loading, setloading] = useState(true);

  const logOut =()=>{
    localStorage.removeItem('token');
    navigate('/login');
}

  

  return (

    <div className='user-home'>
      <Header data={"spider man"} logOut={logOut} />
      <div className="user-body">
        <MenuBar url='/user/reset' />
        <Outlet />
      </div>
    </div>
  )
}

export default UserHome
