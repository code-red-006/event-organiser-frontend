import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { adminBaseURL } from '../../constants';
import './home.css'
import Header from '../../components/Header';
import useFetch from '../../hooks/useAdminVerify';

function AdminHome() {

  return (
    <div className='admin-home'>
      
      <Header />
    </div>
  )
}

export default AdminHome