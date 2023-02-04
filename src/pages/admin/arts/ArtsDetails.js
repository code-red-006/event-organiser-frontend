import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { adminBaseURL } from '../../../constants';
import { useFetch } from '../../../hooks/useFetch';
import UserEvents from '../../users/home/UserEvents';

function ArtsDetails() {

   const {eventId} = useParams();

   const {data: event, pending} = useFetch(`${adminBaseURL}/events/${eventId}`, 'event');

   useEffect(()=>{
    if(!pending) console.log(event.houses)
   }, [pending])

  return (
    <div className="arts-details">
        <div>{event.event_name}</div>
        <div>{event.days}</div>
        <div>{event.date}</div>
        <div>{event.houses && event.houses.map((item, key)=><p key={key}>{item}</p>)}</div>
    </div>
  )
}

export default ArtsDetails