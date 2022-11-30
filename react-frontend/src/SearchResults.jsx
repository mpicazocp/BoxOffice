import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Modal from 'react-modal'
import useLoginToken from './useLoginToken';

import MediaDisplay from './MediaDisplay';
import EditMedia from './EditMedia';
import "./SearchResults.css"

function SearchResults(){

    const navigate = useNavigate();
    const { getLoginToken } = useLoginToken();
    const queryParameters = new URLSearchParams(window.location?.search)

    const [mediaResults, setMediaResults] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [savedMedia, setSavedMedia] = useState({});

    const [index, setIndex] = useState({start: 0, end: 3});
    const [isLoading, setIsLoading] = useState(true);

    async function fetchSearch(name) {
        const key = process.env.REACT_APP_IMDB_API_KEY;
        try {
            const results = await axios.get(`https://imdb-api.com/en/API/SearchTitle/${key}/${name}`);
            return results?.data?.results;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    useEffect(() => {
        const name = queryParameters.get('name');
        if (name) {
            fetchSearch(name)
                .then(res => setMediaResults(res))
                .then(() => setIsLoading(false));
        }
    }, [])

  async function checkIfMediaAlreadyPresent(media) {
        try {
            const newMedia = {...media};
            const check = await axios.get(`http://localhost:7777/media?name=${media.name}`)
            if (check.data.media_list.length !== 0){
                newMedia.alreadyPresentInMediaDatabase = 1;
            }
            return newMedia;
        } catch (err){
            console.debug("err", err);
            return false;
        }
    }

  async function saveMediaDetails(media) {
    try {
        const newMedia = {
            name: media.name,
            desc: media.desc,
            img: media.img,
        };
        let resp;
        if (media.alreadyPresentInMediaDatabase === 1) {
            resp = await axios.get(`http://localhost:7777/media?name=${newMedia.name}`);
            return {
                ...resp.data.media_list[0],
                currentSeason: media.currentSeason,
                currentEpisode: media.currentEpisode,
                currentMinutes: media.currentMinutes,
                currentHours: media.currentHours,
                contentType: media.contentType,
                streamingService: media.streamingService
            };

        }
            resp = await axios.post(`http://localhost:7777/media`, newMedia);
            return {
                ...resp.data,
                currentSeason: media.currentSeason,
                currentEpisode: media.currentEpisode,
                currentMinutes: media.currentMinutes,
                currentHours: media.currentHours,
                contentType: media.contentType,
                streamingService: media.streamingService
            };
    }
    catch (error) {
      console.log(error);
      return false;
    }
  };

  async function mutateUserdata(media, loginToken) {
    const newMedia = {
            mediaList: [
            {
                /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                mediaId: media._id,
                currentEpisode: media.currentEpisode,
                currentSeason: media.currentSeason,
                currentMinutes: media.currentMinutes,
                currentHours: media.currentHours,
                contentType: media.contentType,
                streamingService: media.streamingService
            }]};
    try {
        await axios.patch(`http://localhost:7777/users/${loginToken}`, newMedia);
        return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  const closeModalAndSave = (media) => {
    setIsOpen(false);
    const loginToken = getLoginToken();
    if (loginToken === null) return;
    // Only add if not present in database
    checkIfMediaAlreadyPresent(media)
        .then(res => saveMediaDetails(res))
        .then(resp => mutateUserdata(resp, loginToken));
  }

  const customStyles = {
      content: {
        width: "50%",
        height: "70%",
        transform: 'translate(40%, 0)',
        backgroundColor: '#A13237',
      },
    }

    Modal.setAppElement('#root');

  function moveMediaListLeft(){
    if (index.start - 1 < 0) return
    setIndex({start: index.start - 1, end: index.end - 1});
  }

  function moveMediaListRight(){
    if (index.end + 1 > mediaResults.length) return;
    setIndex({start: index.start + 1, end: index.end + 1});
  }
    return (
       <div className="my-shows-parent">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)} 
                style={customStyles}
            >
                <EditMedia
                    name={savedMedia.name}
                    img={savedMedia.img}
                    desc={savedMedia.desc}
                    closeModalAndSave={closeModalAndSave}
                />
            </Modal>
      <div className="my-shows-header-parent">
        <div className="my-shows-box-office-parent">
        <button className="my-shows-button" type="button" onClick={() => navigate("/")}><span className="my-shows-box">Box</span>Office</button>
        </div>
        <div className="my-shows-search-parent">
            { getLoginToken() !== null && <button type="button" className="myShowsButton" onClick={() => navigate("/myShows")} >My Shows</button>}
        </div>
      </div>
      <div className="my-shows-text">Search Results: {mediaResults.length < 3 ? mediaResults.length : index.end}/{mediaResults.length}</div>
            { isLoading
            ? <div className="searchResults-Loading">LOADING...</div>
            : <div className="my-shows-media-holder">
                    <button type="button" onClick={moveMediaListLeft} className="my-shows-move-left-button">&lt;</button>
                    {mediaResults.slice(index.start, index.end).map( m => 
                        <MediaDisplay key={m.id} media={{img: m.image, name: m.title, desc: m.description}} setSavedMedia={setSavedMedia} setIsOpen={setIsOpen} />
                    )}
                    <button type="button" onClick={moveMediaListRight} className="my-shows-move-right-button">&gt;</button>
               </div>
            }
        </div>
    );
}
export default SearchResults;
