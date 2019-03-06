import React from 'react';
import './Loading.css';


const loading = (props) => {
    return (
    <div className="loadingDiv">
    <div className="spinner">
        <div className="spinner-circle spinner-circle-outer"></div>
        <div className="spinner-circle-off spinner-circle-inner"></div>
        <div className="spinner-circle spinner-circle-single-1"></div>
        <div className="spinner-circle spinner-circle-single-2"></div>
        <div className="text"></div>
    </div>
  </div>
    )
}

export default loading;