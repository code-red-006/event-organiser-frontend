import React from 'react'
import { useEffect } from 'react';
import { userBaseURL } from '../../../constants'
import axios from 'axios'

function UserProgramList() {
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchProgram = async ()=>{
      try {
        
        const res = await axios.get(`${userBaseURL}/events` , { headers: {'Authorization': `Bearer ${token}`} })
        //setEvents(res.data.events)
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  
  return (
    <div>ProgramList</div>
  )
}

export default UserProgramList