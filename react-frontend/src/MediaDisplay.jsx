import React from 'react'

import "./MediaDisplay.css"

function MediaDisplay(props) {

  // retrieve necessary params for props
  const { media, setSavedMedia, setIsOpen } = props;

  // open the media (for overlay)
  const openModal = () => {
    setSavedMedia(media)
    setIsOpen(true);
  }

  // display the image, name, desc, and streamingService
  return (
    <button type="button" className="media-display-parent" onClick={openModal}>
      <img 
        className="media-display-image"
        src={media.img}
        alt={media.img}
      />
      <div className="media-display-title">{media.name}</div>
      <div>{media.desc}</div>
      {media.streamingService && <div>Watched on: {media.streamingService}</div>}
    </button>
  );
}

export default MediaDisplay
