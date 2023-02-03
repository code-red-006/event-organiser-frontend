import axios from 'axios';
import React, { useState } from 'react'
import { adminBaseURL } from '../../../constants';
import Spinner from '../../partials/Spinner';

function AddEventForm() {

    const [data, setData] = useState({event_name: '',date:'' ,days:'', type: [] });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(null);
    const [type, setType] = useState('');

    const handleChangeAdd = (e)=>{
        setType(e.target.value)
    }
    const handleAddType = (e)=>{
        e.preventDefault();
        console.log(data)
    }

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault();
        setError('');
        const url = `${adminBaseURL}/events`;
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(url, data, { headers: {'Authorization': `Bearer ${token}`}})
            console.log(res);
            window.location.reload()

        } catch (error) {
            setError(error.response.data.error.msg);
            //console.log(error.response.data);

        } finally{
            setLoading(false)
        }
    }

  return (
    <div className='add-event-form'>
        <h2>Add event</h2>
        {loading && <Spinner loading={loading} />}
        <form onSubmit={handleSubmit}>
            <div className="name-div">
                <label htmlFor="event_name">Event Name</label>
                <input onChange={handleChange} value={data.event_name} type="text" name='event_name'  />
                <label htmlFor="date">Start Date</label>
                <input onChange={handleChange} value={data.date} type="date" name='date'  />
                <label htmlFor="date">Days</label>
                <input onChange={handleChange} value={data.days} type="number" name='days'  />
                <label htmlFor="type">Type</label>
                <input onChange={handleChangeAdd} value={type} type="text" name='type'  />
                <button onclick={handleAddType}> Add</button>
                <input type="submit" />
            </div>
        </form>
        {error && <span className='error'>{error}</span>} 
        <div>{data.event_name}</div>
        <div>{data.date}</div>
        <div>{data.days}</div>
        <div>{data.days}</div>
        <div>{type}</div>
    </div>
  )
}

export default AddEventForm