import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { adminBaseURL } from '../../../constants';
import { useFetch } from '../../../hooks/useFetch';
import Spinner from '../../partials/Spinner';
import UpdateProgramForm from './UpdateProgram';

function GroupeProgramDetails() {
  const { id } = useParams()
  const {data: programDetails, pending} = useFetch(`${adminBaseURL}/events/programs/groupe/${id}`, 'groupeProgram')
  const [loading, setLoading] = useState(true)
  const [updateForm, setUpdateForm] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!pending){
        if(!programDetails) navigate('/admin/login')
        setLoading(false)
    }
}, [pending])

  const handleEdit= (e)=>{
    e.preventDefault();
    setUpdateForm(true);
  }

  return (
    <div className='program-details'>
      {loading && <Spinner loading={loading} />}
        <div className='program-header'>
          <h1> {programDetails.program_name} </h1>
          <p> {programDetails.description} </p>
          <div className='program-time'>

            <div>
              <h3>Starting time</h3>
              <span> {programDetails.start_time} </span>
            </div>
            <div>
              <h3>Reporting time</h3>
              <span> {programDetails.report_time} </span>
            </div>

            <button onClick={handleEdit}>Edit</button>
          </div>
        </div>
        <div className='participants-list'>
          <h2>Participants</h2>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
          <div>Dummy</div>
        </div>
        {updateForm && <div className="wrapper">
          <UpdateProgramForm eventId={programDetails.event_id} groupe={true} prevData={programDetails} />
          <button onClick={()=>setUpdateForm(false)}>Cancel</button>
        </div>}
    </div>
  )
}

export default GroupeProgramDetails