import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAdminVerify from '../hooks/useAdminVerify';
import Spinner from './Spinner';
import './header.css'

function Header() {
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
    <div className='header'>
    {loading && <Spinner loading={loading} />}
        <h2>Event organizer</h2>
        <div className="username">
            <div className="box1">{data}</div>
            <div onClick={logOut} className="box2">Log out</div>
        </div>
    </div>
  )
}

export default Header