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
        console.log(programDetails);
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

            {programDetails.type && <div>
              <h3>type</h3>
              <span> {programDetails.type} </span>
            </div>}

            <button onClick={handleEdit}>Edit</button>
          </div>
        </div>

        <div className='participants-list'>
          <h2>Participants</h2>
<<<<<<< HEAD
          <div className='participants-table'>
          
          {programDetails.groups?
            <table >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Group Name</th>
                  <th>House</th>
                </tr>
              </thead>
              <tbody>

                {programDetails.groups.map((participant,index)=>{
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{participant.group_name}</td>
                      <td>{participant.house}</td>
                    </tr>
                  )
                } )}
              </tbody>
            </table>
            : <div>No Participant</div>
          }
          </div>
=======
          {programDetails.groups && programDetails.groups.map((item)=>{
            return <h4>{item.group_name}</h4>
          })}
>>>>>>> c6d5eafbd48e2660e57b28f4786a8271ac2baa82
        </div>

        
        {updateForm && <div className="wrapper">
          <UpdateProgramForm eventId={programDetails.event_id} groupe={true} prevData={programDetails} />
          <button onClick={()=>setUpdateForm(false)}>Cancel</button>
        </div>}
    </div>
  )
}

export default GroupeProgramDetails