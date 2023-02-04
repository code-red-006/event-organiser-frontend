import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./arts.css";

function ArtsHome() {
  const [prev, setPrev] = useState(null);


  const location = useLocation();
  const loc = location.pathname.split("/");

  function toggle(e) {
    document.querySelectorAll('.link').forEach(link=>{
        link.classList.remove('clicked')
    })
    e.target.classList.add('clicked')
  }

  useEffect(() => {
    document.querySelectorAll(".link").forEach((link, index) => {
      if (prev === null) {
        const elem = loc[loc.length - 1] === "details" ? 0 : 1;
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
      </div>
      <Outlet  />
    </div>
  );
}

export default ArtsHome;
