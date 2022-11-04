import React, {useState, useEffect} from 'react'

import MediaDisplay from './MediaDisplay'

function MyShows() {

  const [mediaList, setMediaList] = useState([]);

  // Run on page load
  useEffect(() => {
    // Async get media list at some point
    setMediaList(
      [
        {
          name: "Shrek",
          content_type: "PG13",
        },
      ]
    );
  }, [])

  return (
    <div>
      <input type="search" />
      <div>My Shows</div>
      {mediaList.map(media => 
        <MediaDisplay name={media.name} content_type={media.content_type}/>
      )}
      <button type="button">SORT</button>
    </div>
  );
}

export default MyShows;
