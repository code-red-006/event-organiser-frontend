import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import './event.css'
import addIcon from '../images/add.png'
import AddEventForm from './AddEventForm';


function EventList({url, isAdmin}) {
  const [events, setEvents] = useState(null);
  const navigate = useNavigate()
  const { data, pending} = useFetch(url, 'events');
  const [eventForm, setEventForm] = useState(false);
  
  useEffect(()=>{
    if(!pending){
      setEvents(data)
    }
  }, [data]);

  const viewPrograms = (e) =>{
    console.log(e.target.dataset.id);
    navigate(`/admin/programs/${e.target.dataset.id}`)
  }


  return (
    <div className='event-list'>
      <h2>Events</h2>
      <div className="cards-div">
        {events && events.map((event)=>{
          return <div key={event._id} className="card" onClick={viewPrograms} data-id={event._id}>
            <h3>{event.event_name}</h3>
            </div>
        })}
        { isAdmin && <div  className="add-div">
          <div onClick={()=>setEventForm(true)}>
          <img src={addIcon} alt=""  />
          <p id='add-label' className='hidden'>Add event</p>
          </div>
        </div>}
      </div>
        { eventForm && <div className="wrapper">
          <AddEventForm />
          <button onClick={()=>setEventForm(false)}>Cancel</button>
        </div>}
    </div>
  )
}

export default EventList