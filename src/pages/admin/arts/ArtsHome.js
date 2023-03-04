import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import "./arts.css";

function ArtsHome() {
  const [prev, setPrev] = useState(null);
  const { eventId } = useParams();

  const location = useLocation();
  const loc = location.pathname.split("/");

  function toggle(e) {
    document.querySelectorAll('.link').forEach(link=>{
        link.classList.remove('clicked')
    })
    e.target.classList.add('clicked')
  }

  useEffect(() => {
    let elem;
    switch (loc[loc.length - 1]) {
      case "details": elem = 0;
      break;
      case "programs": elem = 1;
      break;
      case "schedule": elem = 2;
      break;
      case "score": elem = 3;
      break;
      default: elem = 0;
        break;
    }
    document.querySelectorAll(".link").forEach((link, index) => {
      if (prev === null) {
        if (elem === index){
            link.classList.add("clicked");
            setPrev(link)
        } 
      }
      link.addEventListener("click", toggle);
    });
    return () => {
      document.querySelectorAll(".link").forEach((link) => {
        link.removeEventListener("click", toggle);
      });
    };
  }, []);

  return (
    <div className="arts-home">
      <div className="navbar">
        <Link className="link" to="details">
          Details
        </Link>
        <Link className="link" to="programs">
          Programs
        </Link>
        <Link className="link" to="schedule">
          Schedule
        </Link>
        <Link className="link" to="score">
          ScoreBoard
        </Link>
      </div>
      <Outlet  />
    </div>
  );
}

export default ArtsHome;
