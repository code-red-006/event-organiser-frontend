import {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userBaseURL } from '../constants';


const useUserVerify = (url) => {
    const [data, setData] = useState(null);
    const [pending, setPending] = useState(true)
    const navigate = useNavigate()

        useEffect(()=>{
            const fetchData = async ()=>{
             const token = localStorage.getItem('token');
             if(!token) navigate('/login');
                try {
                    const res = await axios.get(`${userBaseURL}/verify`,  { headers: {'Authorization': `Bearer ${token}`} });
                    setData(res.data.id)
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

export default useUserVerify