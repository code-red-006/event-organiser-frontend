import React from "react";
import { Link } from "react-router-dom";
import "./menubar.css";

function MenuBar({ reset, home }) {
  return (
    <div className="menu-bar">
      <div className="option">
        <Link to={home}>
          <span class="material-symbols-outlined">home</span>
        </Link>
      </div>
      <div className="option">
        <Link to={reset}>
          <span class="material-symbols-outlined">lock_reset</span>
        </Link>
      </div>
      <div className="option">
        <Link>
          <span class="material-symbols-outlined">info</span>
        </Link>
      </div>
    </div>
  );
}

export default MenuBar;
