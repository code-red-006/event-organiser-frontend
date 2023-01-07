import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SingleProgramContext } from '../store/SingleProgramContext';

function SingleProgramDetails() {
    const { id } = useParams()
    console.log(id);
    const {singleProgramDetails} = useContext(SingleProgramContext);
    console.log(singleProgramDetails);
  return (
    <div>SingleProgramDetails</div>
  )
}

export default SingleProgramDetails