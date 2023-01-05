import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { adminBaseURL } from '../constants';
import AddSingleForm from './AddSingleProgram';
import './programs.css'

function ProgramsList() {
    const { eventId, eventName } = useParams();
    const [single, setSingle] = useState(null);
    const [groupe, setGroupe] = useState(null);
    const [singleForm, setSingleForm] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(()=>{
      const fetchData = async() => {
        const url = `${adminBaseURL}/events/programs/${eventId}`;
        try {
          const res = await axios.get(url, { headers: {'Authorization': `Bearer ${token}`} });
          console.log(res.data);
          setGroupe(res.data.groupe)
          setSingle(res.data.single)
        } catch (error) {
          console.log(error);
        }
      }
      fetchData()
    }, [])

  return (
    <div className='programs-list-div'>
        <h2>{eventName}</h2>
        <div className="single-div">
          <h2>Single programs</h2>
          <div className="programs">
            { single?
                single.length>0?
                  single.map((program, index)=>{
                    return <div key={index} className="program">
                      <h3>{program.program_name}</h3>
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