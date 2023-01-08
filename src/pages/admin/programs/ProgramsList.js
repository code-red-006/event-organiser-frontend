import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { adminBaseURL } from '../../../constants';
import { ProgramContext } from '../../../store/ProgramContext';
import AddProgramForm from './AddProgram';
import './programs.css'

function ProgramsList() {
    const [single, setSingle] = useState(null);
    const [groupe, setGroupe] = useState(null);
    const [singleForm, setSingleForm] = useState(false);
    const [groupeForm, setGroupeForm] = useState(false)
    const [eventName, setEventName] = useState(null)
    const token = localStorage.getItem('token')
    const eventId = localStorage.getItem('eventId')
    const navigate = useNavigate()
    const {setProgramDetails} = useContext(ProgramContext)

    useEffect(()=>{
      const fetchData = async() => {
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

    const removeProgram = async(e) => {
      e.stopPropagation();
      const wantRemove = window.confirm("every data under this program will be delated")
      if(!wantRemove) return;
      const programId = e.target.dataset.id;
      
      const url = e.target.dataset.groupe?
      `${adminBaseURL}/events/remove/groupe/${programId}` :
       `${adminBaseURL}/events/remove/single/${programId}`;
      
      try {
        axios.get(url,  { headers: {'Authorization': `Bearer ${token}`} })
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
    }

    const viewSingleProgramDetails = (e) => {
      const id = e.target.closest("[data-id]").dataset.id;
      const index = e.target.closest("[data-index]").dataset.index;
      const isGroupe = e.target.closest("[data-groupe]").dataset.groupe;
      console.log(isGroupe);
      if(isGroupe == 'true'){
        console.log('hii');
        setProgramDetails(groupe[index])
        navigate(`/admin/programs/groupe/${id}`)
      }else{
        setProgramDetails(single[index]);
        navigate(`/admin/programs/single/${id}`)
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
                    return <div key={index} data-id={program._id} data-groupe={false} data-index={index}  onClick={viewSingleProgramDetails} className="program">
                      <h3>{program.program_name}</h3>
                      <div className="time-div">
                        <p>start time: {program.start_time===''? 'Not set': program.start_time}</p>
                        <p>report time: {program.report_time===''? 'Not set': program.report_time}</p>
                      </div>
                      <div className="controls">
                       <button data-id={program._id} onClick={removeProgram}  className='remove-btn'>Remove</button>
                      </div>
                      </div>
                 }): "empty" : "loading"}
          <button onClick={()=>setSingleForm(true)} className='add-btn'>Add programs</button>
          </div>
        </div>

        <div className="single-div">
          <h2>Groupe programs</h2>
          <div className="programs">
            { groupe?
                groupe.length>0?
                  groupe.map((program, index)=>{
                    return <div key={index} data-id={program._id} data-groupe={true} data-index={index}  onClick={viewSingleProgramDetails} className="program">
                      <h3>{program.program_name}</h3>
                      <div className="time-div">
                        <p>start time: {program.start_time===''? 'Not set': program.start_time}</p>
                        <p>report time: {program.report_time===''? 'Not set': program.report_time}</p>
                      </div>
                      <div className="controls">
                       <button data-id={program._id} onClick={removeProgram} data-groupe={true} className='remove-btn'>Remove</button>
                      </div>
                      </div>
                 }): "empty" : "loading"}
          <button onClick={()=>setGroupeForm(true)} className='add-btn'>Add programs</button>
          </div>
        </div>

        {singleForm && <div className="wrapper">
          <AddProgramForm eventId={eventId} />
          <button onClick={()=>setSingleForm(false)}>Cancel</button>
        </div>}
        {groupeForm && <div className="wrapper">
          <AddProgramForm eventId={eventId} groupe={true} />
          <button onClick={()=>setGroupeForm(false)}>Cancel</button>
        </div>}
    </div>
  )
}

export default ProgramsList