import React from 'react';


function Loader({style, size, location}) {
  
  return (
    <div style={style} className={`overlay`}>
      <div className={`loader ${size} ${location}`}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>  
    </div>
  )
}

Loader.defaultProps = {
  className : "",
  size : "normal",
  location: "center"
}

export default Loader;
