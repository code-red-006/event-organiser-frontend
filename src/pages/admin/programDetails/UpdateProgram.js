import axios from "axios";
import React, { useState } from "react";
import { adminBaseURL } from "../../../constants";
import Spinner from "../../partials/Spinner";

function UpdateProgramForm({ eventId, groupe, prevData }) {
  const [data, setData] = useState({
    program_name: prevData.program_name,
    description: prevData.description,
    start_time: prevData.start_time,
    report_time: prevData.report_time,
    type: prevData.type ? prevData.type : undefined,
    eventId,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");
    const url = groupe
      ? `${adminBaseURL}/events/update/groupe/${prevData._id}`
      : `${adminBaseURL}/events/update/single/${prevData._id}`;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-event-form">
      <h2>Update Program</h2>
      {loading && <Spinner loading={loading} />}
      <form onSubmit={handleSubmit}>
        <div className="name-div">
          <label htmlFor="event_name">Program Name</label>
          <input
            onChange={handleChange}
            value={data.program_name}
            type="text"
            name="program_name"
            required
          />
        </div>
        <div className="description-div">
          <label htmlFor="description">Descripton</label>
          <textarea
            value={data.description}
            name="description"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {data.type && (
          <div className="type-div">
            <label htmlFor="type">Type:</label>
            <select
              onChange={handleChange}
              defaultValue={data.type === "on-stage" ? "on-stage" : "off-stage"}
              name="type"
              id="type"
            >
              <option value="on-stage">On-stage</option>
              <option value="off-stage">Off-stage</option>
            </select>
          </div>
        )}
        <div className="start-div">
          <label htmlFor="start_time">Start Time</label>
          <input
            onChange={handleChange}
            value={data.start_time}
            type="time"
            name="start_time"
          />
        </div>
        <div className="report-div">
          <label htmlFor="report_time">Report Time(optional)</label>
          <input
            onChange={handleChange}
            value={data.report_time}
            type="time"
            max={data.start_time}
            name="report_time"
          />
        </div>
        <input type="submit" />
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default UpdateProgramForm;
