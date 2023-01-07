import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import './login.css'
import axios from 'axios';
import { userBaseURL } from '../../../constants';
import Spinner from '../../partials/Spinner';

function Userlogin() {
  const [data, setData] = useState({ adm_no: "", password: ""});
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value})
  };

  const handleSubmit = async(e) =>{
    setloading(true)
    e.preventDefault()
    setError('')
    const url = `${userBaseURL}/login`;
    try {
      const res = await axios.post(url, data)
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/')

    } catch (error) {
      setError(error.response.data.error.msg);
      console.log(error.response.data.error.msg);

    } finally{
      setloading(false)
    }
  }

  return (
    <div  className='user-login'>
      {loading && <Spinner loading={loading} />}
      <h2 className="title">Login</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className="admn-div">
          <label className='label' htmlFor="adm_no">admission number</label>
          <input className='input_adm_no' onChange={handleChange} value={data.adm_no} type="text" name='adm_no' required />
        </div>
        <div className="password-div">
          <label className='label' htmlFor="password">password</label>
          <input className='input_password' onChange={handleChange} value={data.password} minLength="7" type="password" name='password' required />
        </div>
        <input className='submit' type="submit" value="submit" />
      </form>
      {error && <span className='error'>{error}</span>} 
     </div>
  )
}

export default Userlogin