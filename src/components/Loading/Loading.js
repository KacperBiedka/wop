import React from "react";
import "./Loading.css";

const loading = props => {
  return (
    <svg width="90" height="90" viewBox="0 0 100 100">
      <polyline
        className="line-cornered stroke-still"
        points="0,0 100,0 100,100"
        strokeWidth="10"
        fill="none"
      />
      <polyline
        className="line-cornered stroke-still"
        points="0,0 0,100 100,100"
        strokeWidth="10"
        fill="none"
      />
      <polyline
        className="line-cornered stroke-animation"
        points="0,0 100,0 100,100"
        strokeWidth="10"
        fill="none"
      />
      <polyline
        className="line-cornered stroke-animation"
        points="0,0 0,100 100,100"
        strokeWidth="10"
        fill="none"
      />
    </svg>
  );
};

export default loading;
