import React from 'react'

import "./MediaDisplay.css"

function MediaDisplay(props) {

  const { name, contentType, streamingService, img } = props;

  return (
    <div className="media-display-parent">
      <img 
        className="media-display-image"
        src={img}
        alt={img}
      />
      <div>{name}</div>
      <div>{streamingService}</div>
      <div>{contentType}</div>
    </div>
  );
}

export default MediaDisplay
