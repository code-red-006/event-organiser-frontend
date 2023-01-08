import React, { useContext } from 'react'
import { ProgramContext } from '../../../store/ProgramContext';

function GroupeProgramDetails() {

    const {programDetails} = useContext(ProgramContext);
    console.log(programDetails); // program deatls
  return (
    <div>GroupeProgramDetails</div>
  )
}

export default GroupeProgramDetails