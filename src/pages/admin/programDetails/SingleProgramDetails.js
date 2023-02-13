import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminBaseURL } from '../../../constants'
import { useFetch } from '../../../hooks/useFetch'
import Spinner from '../../partials/Spinner'
import './SingleProgramDetails.css'
import UpdateProgramForm from './UpdateProgram'
import { Table } from 'react-bootstrap'

function SingleProgramDetails() {
  const { id } = useParams()
  const {data: programDetails, pending} = useFetch(`${adminBaseURL}/events/programs/single/${id}`, 'singleProgram')
  const [loading, setLoading] = useState(true);
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
          <div className='participants-table'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Chest No.</th>
                </tr>
              </thead>
              <tbody>
                {programDetails.participants? programDetails.participants.map((participant,index)=>{
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{participant.name}</td>
                      <td>{participant.chestNo}</td>
                    </tr>
                  )
                } ): <div>No Participant</div> }
              </tbody>
            </Table>
          </div>
        </div>



        {updateForm && <div className="wrapper">
          <UpdateProgramForm eventId={programDetails.event_id} groupe={false} prevData={programDetails} />
          <button onClick={()=>setUpdateForm(false)}>Cancel</button>
        </div>}
    </div>
  )
}

export default SingleProgramDetails