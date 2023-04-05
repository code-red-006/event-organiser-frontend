import React, { useEffect, useState } from 'react'
import avatar from '../../../images/avatar.svg'
import './reset.css'
import Spinner from '../../partials/Spinner';
import axios from 'axios';
import { adminBaseURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';

function ResetPasswordForm() {

  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  useEffect(()=>{
    const inputs = document.querySelectorAll(".input");
    console.log(inputs);
    inputs.forEach(input => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });
    
  }, [])


  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault()
    setError('')
    const url = `${adminBaseURL}/reset`;
    const data = {
      new_password: newPass,
      confirm_password: confPass,
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/admin/events')
    } catch (error) {
      setError(error.response.data.error.msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}



  return (
    <div className='reset-div'>
      {loading && <Spinner loading={loading} />}
      <form onSubmit={handleSubmit}>
				<img src={avatar} />
				<h2 className="title">Reset Password</h2>
           		<div className="input-div one">
           		   <div className="i">
           		   		<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		   		<h5>New Password</h5>
           		   		<input onChange={(e)=>setNewPass(e.target.value)} className='input' value={newPass} type="password" name='password' required />
           		   </div>
           		</div>
           		<div className="input-div one">
           		   <div className="i">
           		   		<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		   		<h5>Confirm Password</h5>
           		   		<input onChange={(e)=>setConfPass(e.target.value)} className='input' value={confPass} type="password" name='password' required />
           		   </div>
           		</div>
            	<input type="submit" className="btn" value="Submit" />
            {error && <span className='error'>{error}</span>} 
            </form>
    </div>
  )
}

export default ResetPasswordForm