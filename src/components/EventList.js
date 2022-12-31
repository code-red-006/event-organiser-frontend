import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import './eventList.css'
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
            {event.event_name}
            </div>
        })}
      </div>
        { eventForm && <div className="wrapper">
          <AddEventForm />
          <button onClick={()=>setEventForm(false)}>Cancel</button>
        </div>}
        <div className="add-event">
          <img src={addIcon} onClick={()=>setEventForm(true)} alt=""  />
        </div>
      
    </div>
  )
}

export default EventList