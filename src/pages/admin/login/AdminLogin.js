import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import './login.css'
import axios from 'axios'
import useAdminVerify from '../../../hooks/useAdminVerify';
import { adminBaseURL } from '../../../constants';
import Spinner from '../../partials/Spinner';

function AdminLogin() {
  const [data, setData] = useState({ username: "", password: ""});
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true)
  const navigate = useNavigate();

  const { data: res, pending } = useAdminVerify();
  
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
      <div className='contents'>
        <h2 className="title">WELCOME</h2>
        <form onSubmit={handleSubmit}>
          <div className="username-div">
            <label htmlFor="username">username</label>
            <input onChange={handleChange} value={data.username} type="text" name='username' required />
          </div>
          <div className="password-div">
            <label htmlFor="password">password</label>
            <input onChange={handleChange} value={data.password} minLength="7" type="password" name='password' required />
          </div>
          <input type="submit" value="submit" />
        </form>

      </div>
        {error && <span className='error'>{error}</span>} 
    </div>
  )
}

export default AdminLogin