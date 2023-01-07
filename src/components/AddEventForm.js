import axios from 'axios';
import React, { useState } from 'react'
import { adminBaseURL } from '../constants';
import Spinner from './partials/Spinner';

function AddEventForm() {

    const [data, setData] = useState({event_name: ''});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(null);
    const handleChange = (e) => {
        setData({event_name: e.target.value});
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
            setError(error);
            console.log(error);

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
                <input onChange={handleChange} value={data.event_name} type="text" name='event_name' required />
                <input type="submit" />
            </div>
        </form>
        {error && <span className='error'>{error}</span>} 
    </div>
  )
}

export default AddEventForm