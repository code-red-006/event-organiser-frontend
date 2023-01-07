import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate } from 'react-router';
import './home.css'
import Header from '../../components/partials/Header';
import MenuBar from '../../components/partials/MenuBar';
import useAdminVerify from '../../hooks/useAdminVerify';
import Spinner from '../../components/partials/Spinner';

function AdminHome() {
  const navigate = useNavigate()
  const { data, pending } = useAdminVerify()
  const [loading, setloading] = useState(true);

  const logOut =()=>{
    localStorage.removeItem('token');
    navigate('/admin/login');
}

  useEffect(()=>{
    if(!pending){
        if(!data) navigate('/admin/login')
        setloading(false)
    }
}, [pending])

  return (
    <div className='admin-home'>
      {loading && <Spinner loading={loading} />}
      <Header data={data} logOut={logOut} />
      <div className="admin-body">
        <MenuBar url='/admin/reset' />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminHome