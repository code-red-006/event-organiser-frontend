import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SingleProgramContext } from '../store/SingleProgramContext';

function SingleProgramDetails() {
    const { id } = useParams()
    const {singleProgramDetails} = useContext(SingleProgramContext);
    console.log(singleProgramDetails); // program deatls
  return (
    <div>
        SingleProgramDetails
        {/* display program details  */}
    </div>
  )
}

export default SingleProgramDetails