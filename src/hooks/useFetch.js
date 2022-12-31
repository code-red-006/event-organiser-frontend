import {useState, useEffect} from 'react'
import axios from 'axios';

export const useFetch = (url, name) => {

    const [data, setData] = useState([]);
    const [pending, setPending] = useState(true);

    const token = localStorage.getItem('token');
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const res = await axios.get(url, { headers: {'Authorization': `Bearer ${token}`}});
              setData(res.data[name])
              setPending(false);
            } catch (error) {
              console.log(error);
              setPending(false)
            }
          }
          fetchData();
    }, [])
    return { data, pending}
} 