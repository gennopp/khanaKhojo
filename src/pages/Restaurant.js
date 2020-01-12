import React from "react";
import "../style/restaurant.scss";
import khana from './khana.jpeg'

export default function Restaurant() {
  return (
    <div>
      {" "}
      <h1>Card Flip with Text</h1> <h3>Hover over the image below:</h3>{" "}
      <div className="flip-card">
        {" "}
        <div className="flip-card-inner">
          {" "}
          <div className="flip-card-front">
            {" "}
            <img src={khana} alt="Avatar" />{" "}
          </div>{" "}
          <div className="flip-card-back">
            {" "}
            <h1>
              Restaurant <i>(4.4)</i>
            </h1>{" "}
            <p style={{ bottom: "15%", right: "40%" }}>
              Location <i class="fas fa-map-marker-alt"></i>
            </p>{" "}
            <p style={{ bottom: "0%", right: "30%" }}>+91 9999999999</p>{" "}
          </div>{" "}
        </div>{" "}
        <p style={{ top: "-8%", left: "0%" }}> Paneer Pasanda (4.8)</p>{" "}
        <p style={{ bottom: "-6%", right: "0%" }}>&#x20b9; 9500/-</p>{" "}
      </div>{" "}
    </div>
  );
}
