import axios from "axios";
import React, { useEffect, useState } from "react";
import { adminBaseURL } from "../../../constants";
import Spinner from "../../partials/Spinner";

function UpdateEventForm({ edit }) {
  const [data, setData] = useState({ ...edit });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  const [house, setHouse] = useState("");
  console.log(edit);
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleHouse = (e) => {
    setHouse(e.target.value);
  };

  const addHouse = (e) => {
    e.preventDefault();
    if (house.length < 1) return;
    setData({ ...data, houses: [...data.houses, house] });
    setHouse("");
  };

  const removeHouse = (e) => {
    e.preventDefault();
    const index = e.target.dataset.index;
    let temp = data.houses;
    temp.splice(index, 1);
    setData({ ...data, houses: [...temp] });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");
    const url = `${adminBaseURL}/events/edit/${edit._id}`;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      setError(error.response.data.error.msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-event-form">
      <h2>Update event</h2>
      {loading && <Spinner loading={loading} />}
      <form onSubmit={handleSubmit}>
        <div className="name-div">
          <label htmlFor="event_name">Event Name</label>
          <input
            onChange={handleChange}
            value={data.event_name}
            type="text"
            name="event_name"
            required
          />
        </div>
        <div className="name-div">
          <label htmlFor="date">Start Date</label>
          <input
            onChange={handleChange}
            value={data.date}
            type="date"
            name="date"
          />
        </div>
        <div className="name-div">
          <label htmlFor="date">Days</label>
          <input
            onChange={handleChange}
            value={data.days}
            type="number"
            name="days"
            min={0}
          />
        </div>
        <input type="submit" />
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default UpdateEventForm;
