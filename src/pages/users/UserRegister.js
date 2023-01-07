import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import './UserRegister.css'
import axios from 'axios';
import {userBaseURL} from '../../constants'
import Spinner from '../../components/Spinner';

function UserRegister() {
  const [data, setData] = useState({ name: "", mobile: "", department: "", year: "", adm_no: "", password: ""});
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value})
  };
  
  //user name validation and adding to user register
const handleChangeUserName =(e) => {
  if(e.target.value.match("^[a-zA-Z ]*$") != null){
    setData({ ...data, [e.target.name]: e.target.value})
  }else{
    console.log("error in handlechangeusername");
  }
}

//phone number val and adding 
const handleChangeUserPhone = (e)=>{
  const re = /^[0-9]{1,10}$/;

  if (e.target.value === '' || re.test(e.target.value)) {
    setData({...data, [e.target.name]: e.target.value})
  }else{
    console.log("error in HandleChangePHONE");
  }
}

// department val and adding user reg details
const handleChangeUserDeparment =(e) => {
  if(e.target.value.match("^[a-zA-Z ]*$") != null){
    setData({ ...data, [e.target.name]: e.target.value})
  }else{
    console.log("error in handlechangeDEPARTMENT");
  }
}

//year val and adding to user reg details
const handleChangeUserYear = (e)=>{
  const re = /^[1-3]{1}$/;

  if (e.target.value === '' || re.test(e.target.value)) {
    setData({...data, [e.target.name]: e.target.value})
  }else{
    console.log("error in HandleChangeYear");
  }
}

//admin_no val and adding to user reg details
// const handleChangeUserPassword = (e)=>{
//   const re = /^[0-9]{1,20}$/;

//   if (e.target.value === '' || re.test(e.target.value)) {
//     setData({...data, [e.target.name]: e.target.value})
//   }else{
//     console.log("error in HandleChange'PASSWORD'");
//   }
//}


  /* handlesubmit */
const handleSubmit = async(e) => {
  console.log("submitting");
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
      {loading && <Spinner loading={loading} />}

      <h1>Sign up</h1>

      <div className={'user-registration-form'}>
          <form onSubmit={handleSubmit}>
            
            <div className='user-name'>
              <label htmlFor="name">Name</label>
              <input type="text" 
                name="name" 
                onChange={handleChangeUserName} 
                value={data.name}
                required/>
            </div>

            <div className='user-phone'>
              <label htmlFor="mobile">Phone Number</label>
              <input type= 'number' 
                name="mobile" 
                onChange={handleChangeUserPhone} 
                value={data.mobile}
                required/>
            </div>
            
            <div className='user-department'>
              <label htmlFor="department">Department</label>
              <input type="text" 
                name="department" 
                onChange={handleChangeUserDeparment} 
                value={data.department}
                required/>
            </div>

            <div className='user-year'>
              <label htmlFor="year">Year</label>
              <input type="number" 
                name="year"
                // range 1-3
                onChange={handleChangeUserYear} 
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
      
      {error && <div className='error'>{error}</div>}

    </div>
  )
}

export default UserRegister