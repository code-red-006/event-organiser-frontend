import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { adminBaseURL } from '../../../constants';
import { useFetch } from '../../../hooks/useFetch';

function ArtsScore() {
    const { eventId } = useParams();

    const { data: scores, pending } = useFetch(
        `${adminBaseURL}/events/score/${eventId}`,
        "scores"
    );
    useEffect(() => {
        if (!pending) console.log(scores);
      }, [pending]);
    
  return (
    <div>ArtsScore</div>
  )
}

export default ArtsScore