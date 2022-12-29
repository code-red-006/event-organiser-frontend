import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import './UserRegister.css'
import axios from 'axios';
import { userBaseURL } from '../../constants';

function UserRegister() {
  const [data, setData] = useState({ name: "", mobile: "", department: "", year: "", adm_no: "", password: ""});
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value})
  };

  /* handlesubmit */
const handleSubmit = async(e) => {
  setloading(true);
  e.preventDefault();
  setError('')
  const url = `${userBaseURL}/register`;
  
  try{
    const res = await axios.post(url, data);
    const token = res.data.token;
    localStorage.setItem('token', token)
    navigate('/');
  } catch(error){
    setError(error.response.data.error.msg);
    console.log(error.response.data.error.msg);

  } finally{
    setloading(false)
  }

}

  return (
    <div className='user-registration'>
      <h1>Sign up</h1>

      <div className={'user-registration-form'}>
          <form onSubmit={handleSubmit}>
            
            <div className='user-name'>
              <label htmlFor="name">Name</label>
              <input type="text" 
                name="name" 
                onChange={handleChange} 
                value={data.name}
                required/>
            </div>

            <div className='user-phone'>
              <label htmlFor="mobile">Phone Number</label>
              <input type= 'number' 
                name="mobile" 
                // max and min
                onChange={handleChange} 
                value={data.mobile}
                required/>
            </div>
            
            <div className='user-department'>
              <label htmlFor="department">Department</label>
              <input type="text" 
                name="department" 
                onChange={handleChange} 
                value={data.department}
                required/>
            </div>

            <div className='user-year'>
              <label htmlFor="year">Year</label>
              <input type="number" 
                name="year"
                // range 1-3
                onChange={handleChange} 
                value={data.year}
                required/>
            </div>

            <div className='user-ad-no'>
              <label htmlFor="adm_no">Admission Number</label>
              <input type='number' 
                name="adm_no" 
                onChange={handleChange} 
                value={data.adm_no}
                required/>
            </div>

            <div className='user-password'>
              <label htmlFor="password">Password</label>
              <input type='password' 
                name="password" 

                // range

                onChange={handleChange} 
                value={data.password}
                required/>
            </div>
            <div className='user-submit-button'>
              <button type='submit'>Sign up</button>
            </div>
          </form>
      </div>

      
    </div>
  )
}

export default UserRegister