import React from 'react'

import "./ShowInformation.css"

function ShowInformation (props) {

  // import media properties from props
  const { name, img, rating, streamingService,
    isMovie, currentEpisode, currentSeason,
    currentTime, totalTime, desc } = props;

  function isMovieRender() {
    // if not a movie, render episode, minutes, hrs, etc
    const totalHours = Math.floor(totalTime / 60);
    const totalMinutes = Math.floor(totalTime % 60);
    const currentHours = Math.floor(currentTime / 60);
    const currentMinutes = Math.floor(currentTime % 60);
    if (!isMovie){
      return (
        <span>
          Season: {currentSeason}, Episode {currentEpisode}, at {currentHours}:{currentMinutes}/{totalHours}:{totalMinutes}
        </span>
      );
    }
    // if movie, don't render episode/season
    return <span>at {currentHours}:{currentMinutes}/{totalHours}:{totalMinutes}</span>
  }

  return (
    <div className="show-info-parent">
      <img src={img} alt={img} className="show-info-img"/>
      <div className="show-info-text">
        <div className="show-info-detail-title">Name: <span className="show-info-detail">{name}</span></div>
        <div className="show-info-detail-title">Rated: <span className="show-info-detail">{rating}</span></div>
        <div className="show-info-detail-title">Watched On: <span className="show-info-detail">{streamingService}</span></div>
        <div className="show-info-detail-title">Time: <span className="show-info-detail">{isMovieRender()}</span></div>
        <div className="show-info-detail-title">Description: <div className="show-info-detail">{desc}</div></div>
      </div>
    </div>
  );
}

export default ShowInformation
