import React from 'react'

import "./MediaDisplay.css"

function MediaDisplay(props) {

  const { name, desc, streamingService, img } = props;

  return (
    <div className="media-display-parent">
      <img 
        className="media-display-image"
        src={img}
        alt={img}
      />
      <div className="media-display-title">{name}</div>
      <div>{desc}</div>
      <div>Watched on: {streamingService}</div>
    </div>
  );
}

export default MediaDisplay
