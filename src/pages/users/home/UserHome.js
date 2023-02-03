import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate } from 'react-router';
import './UserHome.css'
import Header from '../../partials/Header';
import MenuBar from '../../partials/MenuBar';
import useUserVerify from '../../../hooks/useUserVerify';
import Spinner from '../../partials/Spinner';

function UserHome() {
  const navigate = useNavigate()
  const { data, pending } = useUserVerify();
  //const [loading, setloading] = useState(true);
  useEffect(() => {
    if(!pending){
      console.log(data);
    }
  }, [pending]);
  const logOut =()=>{
    localStorage.removeItem('token');
    navigate('/login');
}

  

  return (

    <div className='user-home'>
      <Header data={"spider man"} logOut={logOut} />
      <div className="user-body">
        <MenuBar home='/' reset='/user/reset' />
        <Outlet />
      </div>
    </div>
  )
}

export default UserHome
