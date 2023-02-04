import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './UserEvents.css'
import { userBaseURL } from '../../../constants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UserEvents() {
  const token = localStorage.getItem('token')
  const [Events, setEvents] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData =  async ()=>{
      try {
        
        const res = await axios.get(`${userBaseURL}/events` , { headers: {'Authorization': `Bearer ${token}`} })
        setEvents(res.data.events)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

  },[]);

  const viewPrograms = (e) =>{
    localStorage.setItem('eventId', e.target.closest("[data-id]").dataset.id)
    navigate('/events/programs')
  }
   
  function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

  return (
    <div className='user-events'>
        <h2>Events</h2>
        <div className='user-event-cards'>
            {Events.map((card)=>{
              let bgColor = getRandomColor();
              return (
                <div data-id={card._id} style={{backgroundColor : bgColor }}
                  onClick={viewPrograms}>
                  <h3>{card.event_name}</h3>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default UserEvents
