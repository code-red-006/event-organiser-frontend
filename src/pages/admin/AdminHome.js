import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { adminBaseURL } from '../../constants';
import './home.css'

function AdminHome() {
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token) navigate('/admin/login');
        const url = `${adminBaseURL}/verify`
        axios.get(url, { headers: { Authorization: `Bearer ${token}` }})
         .then((data)=>{
            console.log(data);
         })
         .catch((error)=>{
            console.log(error);
            navigate('/admin/login')
         })

    })
  return (
    <div className='home'><h1>Home</h1></div>
  )
}

export default AdminHome