import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MediaDisplay from './MediaDisplay'

import "./MyShows.css"
import useLoginToken from './useLoginToken'

function MyShows() {

  // retrieve the currently logged in user
  const [loginToken] = useLoginToken();

  // this value will hold the current logged in user
  const [allUsers, setAllUsers] = useState();
  const [user, setUser] = useState();

  const [mediaList, setMediaList] = useState([]);
  const [index, setIndex] = useState({start: 0, end: 3});

  const [sortingSelection, setSortingSelection] = useState("");
  const typesOfSorts = ["A-Z", "Z-A", "Streaming Service"];

   // use axios to fetch all users from the backend->database
  async function fetchUsers() {
    try {
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  };

  // retrieve a media object by ID using axios
  async function getMedia(mediaId) {
    try {
      const urlWithId = `http://localhost:5000/media/${mediaId}`;
      const response = await axios.get(urlWithId);
     console.log(response.data);

     return response.data;
    }
   catch (error) {
     console.log(error);
     return false;
    }
  }

  // Run on page load
  useEffect(() => {

    // fetch all users
    fetchUsers().then( result => {
           if (result)
              setAllUsers(result);
    });
    
    // iterate through all users and set current user using token
    allUsers.forEach((allUser) => {
      if (allUser.media.toLowerCase() === loginToken.email.toLowerCase) {
        setUser(user);
      }
    });

    // For each media item in the user's list, iterate through and add to mediaList

    user.media_list.forEach((mediaId) => {
      const response = getMedia(mediaId);
      if (response) {
        setMediaList((current) => [...current, response]);
      }
    })
    
    // setMediaList(
      // [ 
    //     {
    //       name: "Shrek",
    //       rating: "PG-13",
    //       img: "https://upload.wikimedia.org/wikipedia/en/7/7b/Shrek_%282001_animated_feature_film%29.jpg",
    //       streamingService: "Peacock"
    //     },
    //     {
    //       name: "Shrek 2",
    //       rating: "PG-13",
    //       img: "https://upload.wikimedia.org/wikipedia/en/b/b9/Shrek_2_poster.jpg",
    //       streamingService: "Peacock"
    //     },
    //     {
    //       name: "Shrek 3",
    //       rating: "R",
    //       img: "https://upload.wikimedia.org/wikipedia/en/2/22/Shrek_the_Third_%282007_animated_feature_film%29.jpg",
    //       streamingService: "N/A"
    //     },
    //     {
    //       name: "Shrek 4: the one that everybody forgot",
    //       rating: "R",
    //       img: "https://upload.wikimedia.org/wikipedia/en/7/70/Shrek_Forever_After_%282010_animated_feature_film%29.jpg",
    //       streamingService: "Hulu"
    //     },
    //     {
    //       name: "Zapped",
    //       rating: "PG",
    //       img: "https://upload.wikimedia.org/wikipedia/en/9/91/Zapped_2014_Poster.jpg",
    //       streamingService: "Pluto"
    //     },
    //     {
    //       name: "After Earth",
    //       rating: "PG",
    //       img: "https://upload.wikimedia.org/wikipedia/en/5/5b/After_Earth_Poster.jpg",
    //       streamingService: "Prime Video"
    //     }
    //   ]
    // );
  }, [])


  // Where I left off: need to get the user infor passed along to each page: session cookie or props
  // Need to make sure the media list can be accessed from the passed in user
  // next check if the get Media is iterating and fetching correctly, then process that list and display
  // 


  function getSortedMediaList() {
    const temp = [...mediaList];
    if (sortingSelection === "A-Z") {
      temp.sort((a,b) => {
        const fa = a.name.toLowerCase();
        const fb = b.name.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
    }
    else if (sortingSelection === "Z-A") {
      temp.sort((a,b) => {
        const fa = a.name.toLowerCase();
        const fb = b.name.toLowerCase();

        if (fa < fb) {
            return 1;
        }
        if (fa > fb) {
            return -1;
        }
        return 0;
      });
    }
    else if (sortingSelection === "Streaming Service") {
      temp.sort((a,b) => {
        const fa = a.streamingService.toLowerCase();
        const fb = b.streamingService.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
    }

    return temp
  }

  function moveMediaListLeft(){
    if (index.start - 1 < 0) return
    setIndex({start: index.start - 1, end: index.end - 1});
  }

  function moveMediaListRight(){
    if (index.end + 1 > mediaList.length) return;
    setIndex({start: index.start + 1, end: index.end + 1});
  }

  function conditionalButton(){
    if (sortingSelection !== ""){
      return (
        <form className="my-shows-sorting">
            {typesOfSorts.map(val =>
                <div key={val}>
                  <input
                  type="radio"
                  checked={ val === sortingSelection }
                  onChange={() => setSortingSelection(val)}
                  className="my-shows-radio-button"
                  />
                  {val}
                </div>
            )}
          <button type="button" onClick={() => setSortingSelection("")} className="my-shows-close-button">close</button>
        </form>
      );
    }
    return <button type="button" onClick={() => setSortingSelection(typesOfSorts[0])} className="my-shows-sort-button">SORT</button>
  }

  return (
    <div className="my-shows-parent">
      <div className="my-shows-header-parent">
        <div className="my-shows-box-office-parent">
          <div className="my-shows-office"><span className="my-shows-box">Box</span>Office</div>
        </div>
        <div className="my-shows-search-parent">
          <input type="search" className="my-shows-searchbar" placeholder="Filter"/>
        </div>
      </div>
      <div className="my-shows-text">My Shows</div>
      <div className="my-shows-media-holder">
        <button type="button" onClick={moveMediaListLeft} className="my-shows-move-left-button">&lt;</button>
        {getSortedMediaList().slice(index.start, index.end).map(media => 
          <MediaDisplay key={media.name} name={media.name}  streamingService={media.strm_srv}/>
        )}
        <button type="button" onClick={moveMediaListRight} className="my-shows-move-right-button">&gt;</button>
      </div>
      {conditionalButton()}
    </div>
  );
}

export default MyShows;
