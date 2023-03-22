import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { adminBaseURL } from '../../../constants';
import { useFetch } from '../../../hooks/useFetch';

function ArtsScore() {
    const { eventId } = useParams();

    const { data: scores, pending: p1 } = useFetch(
        `${adminBaseURL}/events/score/${eventId}`,
        "scores"
    );
    
    const { data: points, pending: p2 } = useFetch(
        `${adminBaseURL}/participants/score/${eventId}`,
        "participants"
    );

    useEffect(()=>{
      if(!(p1 && p2)){
        console.log(points);
      }
    }, [p1, p2])
    
  return (
    <div className='arts-score'>
      <h1>Houses</h1>
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
      <h1>Individual</h1>
      <table >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>house</th>
            <th>points</th>
          </tr>
        </thead>
        <tbody>

          {points.map((point,index)=>{
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{point.name}</td>
                <td>{point.house}</td>
                <td>{point.points}</td>
              </tr>
            )
          } )}
        </tbody>
      </table>
    
    </div>
    
  )
}

export default ArtsScore