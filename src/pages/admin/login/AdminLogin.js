import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import './style.css'
import axios from 'axios'
import useAdminVerify from '../../../hooks/useAdminVerify';
import { adminBaseURL } from '../../../constants';
import Spinner from '../../partials/Spinner';
import wave from '../../../images/wave.png'
import bg from '../../../images/bg.svg'
import avatar from '../../../images/avatar.svg'

function AdminLogin() {
  const [data, setData] = useState({ username: "", password: ""});
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true)
  const navigate = useNavigate();

  const { data: res, pending } = useAdminVerify();

  const inputs = document.querySelectorAll(".input");


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


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

  
  useEffect(()=>{
    if(!pending){
      if(res) navigate('/admin');
      setloading(false)
    }
  }, [pending])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value})
  };

  const handleSubmit = async(e) =>{
    console.log(data);
    setloading(true)
    e.preventDefault()
    setError('')
    const url = `${adminBaseURL}/login`;
    try {
      const res = await axios.post(url, data)
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/admin')

    } catch (error) {
      setError(error.response.data.error.msg);
      console.log(error.response.data.error.msg);

    } finally{
      setloading(false)
    }
  }

  return (
    <div className='admin-login'>
      
      {loading && <Spinner loading={loading} />}
        <img className="wave" src={wave} />
	<div className="container">
		<div className="img">
			<img src={bg} />
		</div>
		<div className="login-content">
			<form onSubmit={handleSubmit}>
				<img src={avatar} />
				<h2 className="title">Welcome</h2>
           		<div className="input-div one">
           		   <div className="i">
           		   		<i className="fas fa-user"></i>
           		   </div>
           		   <div className="div">
           		   		<h5>Username</h5>
           		   		<input onChange={handleChange} className='input' value={data.username} type="text" name='username' required />
           		   </div>
           		</div>
           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	<h5>Password</h5>
           		    	<input onChange={handleChange} className='input' value={data.password} minLength="7" type="password" name='password' required />
            	   </div>
            	</div>
            	<input type="submit" className="btn" value="Login" />
            {error && <span className='error'>{error}</span>} 
            </form>
        </div>
    </div>
    </div>
  )
}

export default AdminLogin