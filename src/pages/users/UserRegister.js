import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import './register.css'
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
  /* call api using axios -> 
    url = `${userBaseURL}/login`
    after call save token in local storage
    then -> navigate('/)
     */
  return (
    
    <div>
        {/* desaign register form */}
        UserRegister
    </div>
  )
}

export default UserRegister