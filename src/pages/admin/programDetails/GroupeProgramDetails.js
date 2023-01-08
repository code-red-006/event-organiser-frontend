import React, { useContext } from 'react'
import { ProgramContext } from '../../../store/ProgramContext';

function GroupeProgramDetails() {

  const {programDetails} = useContext(ProgramContext);
  console.log(programDetails); // program deatls

  const handleEdit= (e)=>{
    e.preventDefault();
    console.log("hiii");
  }

  return (
    <div className='program-details'>
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
    </div>
  )
}

export default GroupeProgramDetails