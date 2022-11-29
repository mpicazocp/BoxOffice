import React from 'react'

import "./MediaDisplay.css"

function MediaDisplay(props) {
  // assign values to the props passed in
  const { name, desc, streamingService, img } = props;

  // display the image, name, desc, and streamingService
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
