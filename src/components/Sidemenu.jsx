import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Sidemenu() {
  const navigate = useNavigate();
  const menu = [
    { value: "home", label: "Home", linkTo: "/" },
    { value: "quiz", label: "Take Quiz", linkTo: "/quiz" },
    { value: "profile", label: "Profile" },
    { value: "tnc", label: "Term and Condition" },
  ];

  const [active, setActive] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState();

  const handleClickMenu = (idx, link) => {
    setActive(idx);
    if(link) navigate(link);
  }

  return (
    <div className="sm-container">
      <div className={`sm-top ${[active, hoveredIdx].some(el => el === 0) ? "sm-rounded-bottom" : ""}`}>
        <img
          src="/images/harisenin_logo.webp"
          alt="logo"
          width={50}
          height="auto"
        />
        <div>TRIVIA</div>
      </div>
      {menu.map((v, k) => {
        return (
          <div
            className={`sm-list${active === k ? "_active" : ""} ${
              [active, hoveredIdx].some(el => el === k - 1) ? "sm-rounded-top" : ""
            } ${[active, hoveredIdx].some(el => el === k + 1) ? "sm-rounded-bottom" : ""}`}
            key={k}
            onClick={() => handleClickMenu(k, v.linkTo)}
            onMouseEnter={() => setHoveredIdx(k)}
            onMouseLeave={() => setHoveredIdx()}
          >
            {v.label}
          </div>
        );
      })}
      <div
        className={`sm-bottom ${
          [active, hoveredIdx].some(el => el === menu.length - 1) ? "sm-rounded-top" : ""
        } `}
      ></div>
      <Outlet />
    </div>
  );
}
