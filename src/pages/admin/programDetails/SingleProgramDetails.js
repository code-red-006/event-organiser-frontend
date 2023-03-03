import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminBaseURL } from '../../../constants'
import { useFetch } from '../../../hooks/useFetch'
import Spinner from '../../partials/Spinner'
import './SingleProgramDetails.css'
import UpdateProgramForm from './UpdateProgram'

function SingleProgramDetails() {
  const { id } = useParams()
  const {data: programDetails, pending} = useFetch(`${adminBaseURL}/events/programs/single/${id}`, 'singleProgram')
  const [loading, setLoading] = useState(true);
  const [updateForm, setUpdateForm] = useState(false);
  const [finish, setFinish] = useState(false);
  const [first, setFirst] = useState(-1);
  const [second, setSecond] = useState(-1);
  const [third, setThird] = useState(-1);

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

  const handleFinish = () => {

  }

  const handleFirst = (e) => {
    console.log(e.target.value);
    if(e.target.value == -1) return window.alert("Please select an option");
    if(e.target.value == second || e.target.value == third) return window.alert("This person already selected");
    setFirst(e.target.value);
  }

  const handleSecond = (e) => {
    console.log(e.target.value);
    if(e.target.value == -1) return window.alert("Please select an option");
    if(e.target.value == first || e.target.value == third) return window.alert("This person already selected");
    setSecond(e.target.value);
  }

  const handleThird = (e) => {
    console.log(e.target.value);
    if(e.target.value == -1) return window.alert("Please select an option");
    if(e.target.value == first || e.target.value == second) return window.alert("This person already selected");
    setThird(e.target.value);
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
            <button onClick={programDetails.finished? null: ()=>setFinish(true)}>{programDetails.finished? "Finished": "Finish"}</button>

          </div>
        </div>

        <div className='participants-list'>
          <h2>Participants</h2>
          <div className='participants-table'>
          
          {programDetails.participants?
            <table >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Chest No.</th>
                </tr>
              </thead>
              <tbody>

                {programDetails.participants.map((participant,index)=>{
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{participant.name}</td>
                      <td>{participant.chestNo}</td>
                    </tr>
                  )
                } )}
              </tbody>
            </table>
            : <div>No Participant</div>
          }
          </div>
        </div>
        
        {updateForm && <div className="wrapper">
          <UpdateProgramForm eventId={programDetails.event_id} groupe={false} prevData={programDetails} />
          <button onClick={()=>setUpdateForm(false)}>Cancel</button>
        </div>}

          {finish && <div className="wrapper">
            <div className="finish-div">
              <div className="first-div">
              <label htmlFor="first">Select First</label>
              <select value={first} onChange={handleFirst} name="first" id="first">
                  <option value={-1}>select</option>
                {programDetails.participants.map((item, index) => {
                  if(index == second || third == index) return ''
                  return <option value={index}>{item.chestNo}</option>
                })}
              </select>
              </div>
              <div className="second-div">
              <label htmlFor="second">Select Second</label>
              <select onChange={handleSecond} name="second" id="second">
                  <option value={-1}>select</option>
                {programDetails.participants.map((item, index) => {
                  if(index == third || first == index) return ''
                  return <option value={index}>{item.chestNo}</option>
                })}
              </select>
              </div>
              <div className="third-div">
              <label htmlFor="third">Select third</label>
              <select onChange={handleThird} name="third" id="third">
                  <option value={-1}>select</option>
                {programDetails.participants.map((item, index) => {
                  if(index == second || first == index) return ''
                  return <option value={index}>{item.chestNo}</option>
                })}
              </select>
              </div>
 
            </div>
            <button onClick={()=>setFinish(false)}>Cancel</button>
          </div>}

    </div>
  )
}

export default SingleProgramDetails