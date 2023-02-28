import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { adminBaseURL } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import UserEvents from "../../users/home/UserEvents";

function ArtsDetails() {
  const { eventId } = useParams();

  const { data: event, pending } = useFetch(
    `${adminBaseURL}/events/${eventId}`,
    "event"
  );

  useEffect(() => {
    if (!pending) console.log(event);
  }, [pending]);

  return (event &&
    <div className="arts-details">
      <div className="static-details">
        <div>
          <h1> {event.event_name} </h1>
          <p>Type : {event.type}</p>
        </div>
        <div className="time-days">
          <div>
            <p>Date</p>
            <h1>{event.date}</h1>
          </div>
          <div>
            <p>Days</p>
            <h1>{event.days}</h1>
          </div>
        </div>
      </div>

      <div className="house-names">
        {event.houses &&
          event.houses.map((item, key) => <div key={key}>{item.name}</div>)}
      </div>
    </div>
  );
}

export default ArtsDetails;
