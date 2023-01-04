import React from 'react'
import { useParams } from 'react-router-dom'

function ProgramsList() {
    const { eventId } = useParams()
  return (
    <div>
        {eventId}
    </div>
  )
}

export default ProgramsList