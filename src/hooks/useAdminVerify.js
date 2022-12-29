import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { adminBaseURL } from '../constants';


const useAdminVerify = (url) => {
    const [data, setData] = useState(null);
    const [pending, setPending] = useState(true)
    const navigate = useNavigate()

        useEffect(()=>{
            const fetchData = async ()=>{
             const token = localStorage.getItem('token');
             if(!token) navigate('/admin/login');
                try {
                    const res = await axios.get(`${adminBaseURL}/verify`,  { headers: {'Authorization': `Bearer ${token}`} });
                    setData(res.data.username)
                    setPending(false)
                } catch (error) {
                    console.log(error.response.data.msg);
                    setPending(false)
                }
            }
            fetchData()
        }, [])
        return { data, pending }
}

export default useAdminVerify