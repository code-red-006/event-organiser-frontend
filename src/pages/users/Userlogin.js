import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import './login.css'
import axios from 'axios';
import { userBaseURL } from '../../constants';

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
    <div>
      {/* desaign login form */}
      {/* input name and value ="adm_no" */}
      {/* input name and value="password" */}
      Userlogin
    </div>
  )
}

export default Userlogin