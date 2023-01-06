import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { adminBaseURL } from '../constants';
import AddSingleForm from './AddSingleProgram';
import './programs.css'

function ProgramsList() {
    const [single, setSingle] = useState(null);
    const [groupe, setGroupe] = useState(null);
    const [singleForm, setSingleForm] = useState(false)
    const [eventName, setEventName] = useState(null)
    const token = localStorage.getItem('token')
    const eventId = localStorage.getItem('eventId')

    useEffect(()=>{
      const fetchData = async() => {
        console.log(eventId);
        const url = `${adminBaseURL}/events/programs/${eventId}`;
        try {
          const res = await axios.get(url, { headers: {'Authorization': `Bearer ${token}`} });
          console.log(res.data);
          setGroupe(res.data.groupe)
          setSingle(res.data.single)
          setEventName(res.data.event.event_name)
        } catch (error) {
          console.log(error);
        }
      }
      fetchData()
    }, [eventId]);

    const removeSingleProgram = async(e) => {
      e.stopPropagation();
      const wantRemove = window.confirm("every data under this program will be delated")
      if(!wantRemove) return;
      const programId = e.target.dataset.id;
      const url = `${adminBaseURL}/events/remove/single/${eventId}/${programId}`
      try {
        axios.get(url,  { headers: {'Authorization': `Bearer ${token}`} })
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className='programs-list-div'>
        {eventName && <h2>{eventName}</h2>}
        <div className="single-div">
          <h2>Single programs</h2>
          <div className="programs">
            { single?
                single.length>0?
                  single.map((program, index)=>{
                    return <div key={index} className="program">
                      <h3>{program.program_name}</h3>
                      <button data-id={program._id} onClick={removeSingleProgram} className='remove-btn'>Remove</button>
                      </div>
                 }): "empty" : "loading"}
          <button onClick={()=>setSingleForm(true)} className='add-btn'>Add programs</button>
          </div>
        </div>
        {singleForm && <div className="wrapper">
          <AddSingleForm eventId={eventId} />
          <button onClick={()=>setSingleForm(false)}>Cancel</button>
        </div>}
    </div>
  )
}

export default ProgramsList