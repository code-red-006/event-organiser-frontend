import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { adminBaseURL } from '../../../constants';
import { useFetch } from '../../../hooks/useFetch';

function ProgramSchedule() {
  const {eventId} =  useParams();
  const url = `${adminBaseURL}/events/programs/${eventId}`
  
  const { data: single} = useFetch(url,'single')
  const { data: groupe} = useFetch(url, 'groupe')

  let prog = single.concat(groupe)

  prog.sort((a,b) => (a.start_time  > b.start_time) ? 1 : ((b.start_time > a.start_time ) ? -1 : 0))

  return (
    <div>
      {prog.map((program)=>{
        return (<div>{program.program_name}: {program.start_time}</div>)
      })}
    </div>
  )
}

export default ProgramSchedule