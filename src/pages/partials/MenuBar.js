import React from 'react'
import { Link } from 'react-router-dom'
import './menubar.css'


function MenuBar({url}) {
  return (
    <div className='menu-bar'>
      <h3>Dashboard</h3>
      <div className="option"><Link to='/admin/reset'>Home</Link></div>
      <div className="option"><Link to={url} >Reset Password</Link></div>
      <div className="option"><Link>About</Link></div>

    </div>
  )
}

export default MenuBar