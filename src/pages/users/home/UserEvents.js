import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './UserEvents.css'

function UserEvents() {
  const [test, settest] = useState(['Harry potter', 'Percy Jackson', 'Lord of the Ring', 'Hobbit', 'Good Omens', 'Famous Five', 'Five Find-Outers', 'Dairy of a Wimpy kid']);

  function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

  return (
    <div className='user-events'>
        <h2>Events</h2>
        <div className='user-event-cards'>
            {test.map((card)=>{
              let bgColor = getRandomColor();
              console.log(bgColor)
              return (
                <div style={{backgroundColor : bgColor }}
                  onClick={()=>{
                    console.log(`You Clicked ${card}`)
                  
                  }}>
                  <h3>{card}</h3>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default UserEvents
