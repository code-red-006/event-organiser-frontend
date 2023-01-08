import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProgramContext } from '../../../store/ProgramContext';
import './SingleProgramDetails.css'

function SingleProgramDetails() {
    const { id } = useParams()
    const {programDetails} = useContext(ProgramContext);
    console.log(programDetails); // program deatls
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

export default SingleProgramDetails