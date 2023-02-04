import axios from "axios";
import React, { useEffect, useState } from "react";
import { adminBaseURL } from "../../../constants";
import Spinner from "../../partials/Spinner";

function AddEventForm() {
  const [data, setData] = useState({
    event_name: "",
    date: "",
    days: 1,
    type: "Arts",
    houses: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  const [house, setHouse] = useState("");

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

  useEffect(()=>{
    console.log(data);
  }, [data])

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setData({...data, days: parseInt(data.days)})
    setError("");
    const url = `${adminBaseURL}/events`;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      setError(error.response.data.error.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-event-form">
      <h2>Add event</h2>
      {loading && <Spinner loading={loading} />}
      <form onSubmit={handleSubmit}>
        <div className="name-div">
          <label htmlFor="event_name">Event Name</label>
          <input
            onChange={handleChange}
            value={data.event_name}
            type="text"
            name="event_name"
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
        <div className="type-div">
          <label htmlFor="type">Type :</label>
          <select onChange={handleChange} name="type" id="type">
            <option value="Arts">Arts</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {data.type === "Arts" && (
          <>
            {" "}
            <div className="name-div">
              <label htmlFor="date">houses</label>
              <input
                onChange={handleHouse}
                value={house}
                type="text"
                name="house"
              />
            </div>
            <div className="add-house">
              <button onClick={addHouse}>Add</button>
            </div>
            {data.houses.length > 0 && (
              <div className="house-div">
                {data.houses.map((item, key) => (
                  <div className="house" key={key}>
                    <p>{item}</p>
                    <button data-index={key} onClick={removeHouse}>
                    X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <input type="submit" value='submit' />
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default AddEventForm;
