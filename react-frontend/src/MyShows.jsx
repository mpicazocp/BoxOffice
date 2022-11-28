import React, {useState, useEffect} from 'react'
// import { useNavigate, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import useLoginToken from './useLoginToken';

import MediaDisplay from './MediaDisplay'
import "./MyShows.css"


function MyShows() {

    const navigate = useNavigate();
  const { getLoginToken } = useLoginToken();

  const [mediaList, setMediaList] = useState([]);
  const [index, setIndex] = useState({start: 0, end: 3});

  const [sortingSelection, setSortingSelection] = useState("");
  const typesOfSorts = ["A-Z", "Z-A", "Streaming Service"];

  async function fetchMedia(id) {
    try {
      const response = await axios.get(`http://localhost:5000/media/${id}`);
      return response.data.media_list;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  };

  // Run on page load
  useEffect(() => {
    const loginToken = getLoginToken();
    if (loginToken === null) navigate('/');

    axios.get(`http://localhost:5000/users/${loginToken}`)
      .then(response => {
        const userMedias = response.data.users_list.media_list;
        return Promise.all(userMedias.map(id => fetchMedia(id)));
      })
      .then(responseArray => {
        setMediaList(responseArray);
      })
      .catch(error => console.log(error.response));
    setMediaList([]);
  }, [])

  function getSortedMediaList() {
    const temp = [...mediaList];
    temp.sort((a,b) => {
        let fa;
        let fb;
        switch (sortingSelection) {
            case "A-Z":
                fa = a.name.toLowerCase();
                fb = b.name.toLowerCase();
                break;
            case "Z-A":
                fa = b.name.toLowerCase();
                fb = a.name.toLowerCase();
                break;
            case "Streaming Service":
                fa = a.streamingService.toLowerCase();
                fb = b.streamingService.toLowerCase();
                break;
            default: break;
        }
        if (fa < fb) return -1;
        if (fa > fb) return  1;
        return 0;
    })
    return temp;
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
        <button className="my-shows-button" type="button" onClick={() => navigate("/")}><span className="my-shows-box">Box</span>Office</button>
        </div>
        <div className="my-shows-search-parent">
          <input type="search" className="my-shows-searchbar" placeholder="Filter"/>
        </div>
      </div>
      <div className="my-shows-text">My Shows</div>
      { mediaList.length === 0 
       ? <div className="my-shows-no-media">No Media To Display!</div>
       : <div>
            <div className="my-shows-media-holder">
                <button type="button" onClick={moveMediaListLeft} className="my-shows-move-left-button">&lt;</button>
                    {getSortedMediaList().slice(index.start, index.end).map(media => 
                      <MediaDisplay key={media.name} name={media.name} streamingService={media.streamingService} img={media.img} desc={media.desc}/>
                    )}
                <button type="button" onClick={moveMediaListRight} className="my-shows-move-right-button">&gt;</button>
            </div>
            {conditionalButton()}
        </div>
      }
    </div>
  );
}

export default MyShows;
