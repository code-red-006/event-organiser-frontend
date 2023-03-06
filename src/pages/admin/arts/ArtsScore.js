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
    <div className='arts-score'>
      <table >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Overall Score</th>
          </tr>
        </thead>
        <tbody>

          {scores.map((score,index)=>{
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{score.name}</td>
                <td>{score.overall}</td>
              </tr>
            )
          } )}
        </tbody>
      </table>
    </div>
  )
}

export default ArtsScore