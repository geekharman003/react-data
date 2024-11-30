import React from "react";
import "./Card.css";

function Card({ schemeName }) {
  return (
    <div className="card">
      <h3>{schemeName}</h3>
    </div>
  );
}

export default Card;
