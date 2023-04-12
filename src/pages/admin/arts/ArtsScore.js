import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { adminBaseURL } from '../../../constants';
import { useFetch } from '../../../hooks/useFetch';

function ArtsScore() {
    const { eventId } = useParams();

    const { data: scores, pending: p1 } = useFetch(
        `${adminBaseURL}/events/score/${eventId}`,
        "scores"
    );

    const [points, setPoint] = useState([]);
    
    const { data: participants, pending: p2 } = useFetch(
        `${adminBaseURL}/participants/score/${eventId}`,
        "participants"
    );

    useEffect(()=>{
      if(!p2){
        let temp = []
        participants.forEach((item)=>{
          item.events.forEach((item)=>{
            if(item.event_id == eventId) temp.push(item.points)
          })
        })
        setPoint([...temp])
      }
    }, [p2])
    
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

          {participants.map((point,index)=>{
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{point.name}</td>
                <td>{point.house}</td>
                <td>{points[index]}</td>
              </tr>
            )
          } )}
        </tbody>
      </table>
    
    </div>
    
  )
}

export default ArtsScore