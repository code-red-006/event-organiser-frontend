import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import './event.css'
import addIcon from '../images/add.png'
import AddEventForm from './AddEventForm';
import bin from '../images/bin.png'
import editbtn from '../images/edit.png'
import axios from 'axios';
import { adminBaseURL } from '../constants';
import UpdateEventForm from './UpdateEventForm';
import Spinner from './Spinner';


function EventList({url, isAdmin}) {
  const [events, setEvents] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState({})
  const navigate = useNavigate()
  const { data, pending} = useFetch(url, 'events');
  const [eventForm, setEventForm] = useState(false);
  
  useEffect(()=>{
    if(!pending){
      setEvents(data)
      setLoading(false)
    }
  }, [data]);

  const viewPrograms = (e) =>{
    console.log(e.target.dataset.id);
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    if(isAdmin) navigate(`/admin/programs/${id}/${name}`)
    //TODO user route
  }

  const removeEvent = (e) => {
    e.stopPropagation()
    const id = events[e.target.dataset.index]._id
    const wantRemove = window.confirm(`Are you sure You want to delete ${events[e.target.dataset.index].event_name}`)
    if(wantRemove){
      const url = `${adminBaseURL}/events/delete/${id}`
      const token = localStorage.getItem('token')
      try {
        axios.get(url, { headers: {'Authorization': `Bearer ${token}`}})
        window.location.reload()
      } catch (error) {
        console.log(error);
        window.location.reload()
      }
    }
  }

  const editEvent = (e) => {
    e.stopPropagation()
    const index = e.target.dataset.index
    setEdit(events[index])
    setEditForm(true)
  }

  return (
    <div className='event-list'>
      {loading && <Spinner loading={loading} />}
      <h2>Events</h2>
      <div className="cards-div">
        {events && events.map((event, index)=>{
          return <div key={event._id} className="card" onClick={viewPrograms} data-name={event.event_name} data-id={event._id}>
            <h3>{event.event_name}</h3>
            {isAdmin && <div className="controls">
            <img onClick={editEvent} data-index={index} src={editbtn} alt="" />
            <img onClick={removeEvent} data-index={index} src={bin} alt="" />
            </div>}
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
        { editForm && <div className="wrapper">
          <UpdateEventForm edit={edit} />
          <button onClick={()=>setEditForm(false)}>Cancel</button>
        </div>}
    </div>
  )
}

export default EventList