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

    async function fetchSearch(name) {
        const key = process.env.REACT_APP_IMDB_API_KEY;
        console.debug(key, name);
        try {
            // const results = await axios.get(`https://imdb-api.com/en/API/SearchTitle/${key}/${name}`);
            const results = {
                  "data": {
                    "searchType": "Title",
                    "expression": "shrek",
                    "results": [
                      {
                        "id": "tt0126029",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.7273_AL_.jpg",
                        "title": "Shrek",
                        "description": "(2001)"
                      },
                      {
                        "id": "tt0298148",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMDJhMGRjN2QtNDUxYy00NGM3LThjNGQtMmZiZTRhNjM4YzUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.7273_AL_.jpg",
                        "title": "Shrek 2",
                        "description": "(2004)"
                      },
                      {
                        "id": "tt0892791",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMTY0OTU1NzkxMl5BMl5BanBnXkFtZTcwMzI2NDUzMw@@._V1_Ratio0.7273_AL_.jpg",
                        "title": "Shrek Forever After",
                        "description": "(2010)"
                      },
                      {
                        "id": "tt0413267",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BOTgyMjc3ODk2MV5BMl5BanBnXkFtZTcwMjY0MjEzMw@@._V1_Ratio0.7273_AL_.jpg",
                        "title": "Shrek the Third",
                        "description": "(2007)"
                      },
                      {
                        "id": "tt3070936",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BN2U4YzBhNmYtNzAxZS00ZjcyLTg5NDEtMDM4ODVkMTZlZmNkXkEyXkFqcGdeQXVyNzMwOTY2NTI@._V1_Ratio0.7273_AL_.jpg",
                        "title": "Shrek the Musical",
                        "description": "(2013)"
                      },
                      {
                        "id": "tt0897387",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BZDE0NGZkOGMtNGY4My00OTM4LTliM2MtM2Y5OTVjOTFmNTA5XkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_Ratio0.7273_AL_.jpg",
                        "title": "Shrek the Halls",
                        "description": "(2007) (TV Short)"
                      },
                      {
                        "id": "tt10167324",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMmVkNDkwNjktODBjYi00MTczLTgzNTctZTIxNTYxNjYyMzE5XkEyXkFqcGdeQXVyNjAyNTUxMzA@._V1_Ratio1.0000_AL_.jpg",
                        "title": "Shrek is Love, Shrek is Life",
                        "description": "(2014) (Video)"
                      },
                      {
                        "id": "tt9334162",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BZDY3ZDFjZWYtNDhmNC00OGVjLWIxZDYtNzlmYTAyYjMwNTcyXkEyXkFqcGdeQXVyNTk5NzczMDE@._V1_Ratio0.7273_AL_.jpg",
                        "title": "Shrek Retold",
                        "description": "(2018)"
                      }
                    ],
                    "errorMessage": ""
                  },
                  "status": 200,
                  "statusText": "OK",
                  "headers": {
                    "content-type": "application/json; charset=utf-8"
                  },
                  "config": {
                    "transitional": {
                      "silentJSONParsing": true,
                      "forcedJSONParsing": true,
                      "clarifyTimeoutError": false
                    },
                    "transformRequest": [
                      null
                    ],
                    "transformResponse": [
                      null
                    ],
                    "timeout": 0,
                    "xsrfCookieName": "XSRF-TOKEN",
                    "xsrfHeaderName": "X-XSRF-TOKEN",
                    "maxContentLength": -1,
                    "maxBodyLength": -1,
                    "env": {},
                    "headers": {
                      "Content-Type": null
                    },
                    "method": "get",
                    "url": "https://imdb-api.com/en/API/SearchTitle/k_842mh260/shrek"
                  },
                  "request": {}
                }
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
            fetchSearch(name).then(res => setMediaResults(res));
        }
    }, [])

  async function saveMediaDetails(media) {
    const newMedia = {
        name: media.name,
        desc: media.desc,
        img: media.img,
    };
    try {
        const resp = await axios.post(`http://localhost:7777/media`, newMedia);
        return {
            ...resp.data,
            currentSeason: media.currentSeason,
            currentEpisode: media.currentEpisode,
            currentMinutes: media.currentMinutes,
            currentHours: media.currentHours
        };
    }
    catch (error) {
      console.log(error);
      return false;
    }
  };

  async function mutateUserdata(media, loginToken) {
    console.debug("m", media);
    const newMedia = {
            mediaList: [
            {
                /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                mediaId: media._id,
                currentEpisode: media.currentEpisode,
                currentSeason: media.currentSeason,
                currentMinutes: media.currentMinutes,
                currentHours: media.currentHours
            }]};
    console.debug(newMedia);
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
    saveMediaDetails(media).then(resp => mutateUserdata(resp, loginToken));
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

    return (
       <div className="listings-page-parent">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)} 
                style={customStyles}
            >
                <EditMedia
                    name={savedMedia.name}
                    img={savedMedia.img}
                    desc={savedMedia.desc} closeModalAndSave={closeModalAndSave}
                />
            </Modal>
            <div className="listings-page-header">
                <button className="homeButton" type="button" onClick={() => navigate("/")}><span className="my-shows-box">Box</span>Office</button>
                <div className= "headerTxt">Search Results</div>
            </div>
            <div className="listingParent">
                {mediaResults.map( m => 
                    <MediaDisplay key={m.id} media={{img: m.image, name: m.title, desc: m.description}} setSavedMedia={setSavedMedia} setIsOpen={setIsOpen} />
                )}
            </div>
        </div>
    );
}
export default SearchResults;
