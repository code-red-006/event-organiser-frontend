import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SingleProgramContext } from '../../../store/SingleProgramContext';
import './SingleProgramDetails.css'

function SingleProgramDetails() {
    const { id } = useParams()
    const {singleProgramDetails} = useContext(SingleProgramContext);
    console.log(singleProgramDetails); // program deatls
  return (
    <div className='program-details'>
        <div className='program-header'>
          <h1> {singleProgramDetails.program_name} </h1>
          <p> {singleProgramDetails.description} </p>
          <div className='program-time'>

            <div>
              <h3>Starting time</h3>
              <span> {singleProgramDetails.start_time} </span>
            </div>
            <div>
              <h3>Reporting time</h3>
              <span> {singleProgramDetails.report_time} </span>
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