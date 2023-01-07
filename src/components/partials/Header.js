import React from 'react'
import './header.css'

function Header({data, logOut}) {
  return (
    <div className='header'>
        <h2>Event organizer</h2>
        <div className="username">
            <div className="box1">{data}</div>
            <div onClick={logOut} className="box2">Log out</div>
        </div>
    </div>
  )
}

export default Header