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
        console.debug(name, key);
        try {
            // const results = await axios.get(`https://imdb-api.com/en/API/SearchTitle/${key}/${name}`);
             const results = {
                  "data": {
                    "searchType": "Title",
                    "expression": "hannah",
                    "results": [
                      {
                        "id": "tt0493093",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BYjZhY2NiN2EtMjMwZi00YTZlLTljOTktYTExNjliZTQ5ZTMxXkEyXkFqcGdeQXVyODk1MjAxNzQ@._V1_Ratio0.6757_AL_.jpg",
                        "title": "Hannah Montana",
                        "description": "2006–2011 TV Series Miley Cyrus, Emily Osment"
                      },
                      {
                        "id": "tt0091167",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMWZiNWUwYjMtM2Y1Yi00MTZmLWEwYzctNjVmYWM0OTFlZDFhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6757_AL_.jpg",
                        "title": "Hannah and Her Sisters",
                        "description": "1986 Mia Farrow, Dianne Wiest"
                      },
                      {
                        "id": "tt1114677",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMTkxNjUxODY3NF5BMl5BanBnXkFtZTcwMjQyMzMzMg@@._V1_Ratio0.6757_AL_.jpg",
                        "title": "Hannah Montana: The Movie",
                        "description": "2009 Miley Cyrus, Emily Osment"
                      },
                      {
                        "id": "tt4432006",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BNWJmMWIxMjQtZTk0Mi00YTE0LTkyNzAtYzQxYjcwYjE4ZDk2XkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_Ratio0.7027_AL_.jpg",
                        "title": "Hannah",
                        "description": "2017 Charlotte Rampling, André Wilms"
                      },
                      {
                        "id": "tt5734576",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMjA1MTIwODY4Nl5BMl5BanBnXkFtZTgwNzkxNDc2NjM@._V1_Ratio0.6757_AL_.jpg",
                        "title": "The Possession of Hannah Grace",
                        "description": "2018 Shay Mitchell, Grey Damon"
                      },
                      {
                        "id": "tt14951434",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BM2RlNTgzYTAtZDEwOS00YjIzLWI5OTktNWQ5MDRhMWQ3ZmU0XkEyXkFqcGdeQXVyODk1MjAxNzQ@._V1_Ratio0.6757_AL_.jpg",
                        "title": "Hannah Swensen Mysteries",
                        "description": "2021– TV Series Alison Sweeney, Cameron Mathison"
                      },
                      {
                        "id": "tt1674773",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMjIyMDM2NTUyNF5BMl5BanBnXkFtZTcwOTQ2NzAzOQ@@._V1_Ratio0.6757_AL_.jpg",
                        "title": "Hannah Arendt",
                        "description": "2012 Barbara Sukowa, Axel Milberg"
                      },
                      {
                        "id": "tt6932244",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMDhjNzJmN2YtNDY0OS00MGZhLWJlNWMtY2M2Yzg0MWJkMTZhXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_Ratio0.6757_AL_.jpg",
                        "title": "Hanna",
                        "description": "2019–2021 TV Series Esme Creed-Miles, Mireille Enos"
                      },
                      {
                        "id": "tt0841108",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BZDRlZWI1OGQtYjE4Zi00NTZhLWE4MGQtMmRmN2RlY2IzZTI4XkEyXkFqcGdeQXVyNDI4ODM5MDM@._V1_Ratio0.7568_AL_.jpg",
                        "title": "Hannah Takes the Stairs",
                        "description": "2007 Greta Gerwig, Kent Osborne"
                      },
                      {
                        "id": "tt8465676",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BY2I3MThmYTctZTU4YS00YWNmLTg4YzktNDY0ZGE5MmQ3Y2Q3XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.7297_AL_.jpg",
                        "title": "Hannah Gadsby: Nanette",
                        "description": "2018 TV Special Hannah Gadsby"
                      },
                      {
                        "id": "tt4669306",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMjUxMmEwOTEtMWZhYi00MWM3LTg0ZGYtODVlODg1YzM5YzRhXkEyXkFqcGdeQXVyNjU0NTI0Nw@@._V1_Ratio0.6757_AL_.jpg",
                        "title": "Kidnapped: The Hannah Anderson Story",
                        "description": "2015 TV Movie Jessica Amlee, Scott Patterson"
                      },
                      {
                        "id": "tt10332256",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BZTJiOTZiZGEtMmQ4ZS00ZTNmLWJhODUtODZlZjc3MWNiN2U3XkEyXkFqcGdeQXVyMTAwMzM3NDI3._V1_Ratio0.6757_AL_.jpg",
                        "title": "Hannah Gadsby: Douglas",
                        "description": "2020 TV Special Hannah Gadsby"
                      },
                      {
                        "id": "tt2509268",
                        "resultType": "Title",
                        "image": "",
                        "title": "Hannah",
                        "description": "2011 Short Hannah Dempsey"
                      },
                      {
                        "id": "tt18782152",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BYTA1NmUwMWItNmM4MS00NDc1LWJlNzYtNDhiNzc4NzY0NDU1XkEyXkFqcGdeQXVyMTUxMTE2MzM3._V1_Ratio0.6757_AL_.jpg",
                        "title": "HANNAH",
                        "description": "2022 Short Laurna Tamzin Ewart, Honor Davis-Pye"
                      },
                      {
                        "id": "tt2014400",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BNGRkODc0N2ItNGFmNS00MWU5LTkzNTgtZDY0OTNkMzcyYmIwXkEyXkFqcGdeQXVyNTk1ODg5ODA@._V1_Ratio0.7027_AL_.jpg",
                        "title": "Wizards on Deck with Hannah Montana",
                        "description": "2009 Video Selena Gomez, David Henrie"
                      },
                      {
                        "id": "tt11764352",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMWEwYjdkOTQtYzEzZS00ZWZjLTgyMzgtNjRiNTMyMjg1ZDZjXkEyXkFqcGdeQXVyMTM4NTY4MDY@._V1_Ratio0.7027_AL_.jpg",
                        "title": "Finding Hannah",
                        "description": "Barry Newman, Diana Muldaur"
                      },
                      {
                        "id": "tt1315214",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMTMyMTk0MTY2NV5BMl5BanBnXkFtZTcwMzQ1NDk2Mw@@._V1_Ratio0.7027_AL_.jpg",
                        "title": "Hannah Free",
                        "description": "2009 Sharon Gless, Maureen Gallagher"
                      },
                      {
                        "id": "tt13591918",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BZTBjZWU3NmYtMTkwOC00YmJkLWE0ZDItY2I0ODVjOTg1MTYzXkEyXkFqcGdeQXVyMjc3MDg0MDA@._V1_Ratio0.6757_AL_.jpg",
                        "title": "For Hannah",
                        "description": "2021 Shannon Brown, Carla Abruzzo"
                      },
                      {
                        "id": "tt1935139",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMjIyMTA0NDgyMV5BMl5BanBnXkFtZTcwODExNDA0OQ@@._V1_Ratio0.6757_AL_.jpg",
                        "title": "Hannah Has a Ho-Phase",
                        "description": "2012 Meredith Forlenza, Genevieve Hudson-Price"
                      },
                      {
                        "id": "tt11959452",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BNWUyZDRkOTEtZDM4ZC00NWE2LTkwYTgtOWMxNGYxNjI3Yzg0XkEyXkFqcGdeQXVyOTM4MzQzOTk@._V1_Ratio0.6757_AL_.jpg",
                        "title": "The Suppression of Hannah Stevenson",
                        "description": "2022 Tom Hogan, Hannah Rose"
                      },
                      {
                        "id": "tt1784465",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMzI0YmFkZjMtMTY2NC00ODU3LTlkNjItNTVmZWRiOGNkYjAwXkEyXkFqcGdeQXVyNTMyODM3MTg@._V1_Ratio0.9189_AL_.jpg",
                        "title": "Hannah Mantegna",
                        "description": "2010 Short Andie Bolt, Erin Gibson"
                      },
                      {
                        "id": "tt16375578",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMjBkNGNjNjUtMTg4OC00NTEzLWEyYWEtYzAwZjViYzUwOWI4XkEyXkFqcGdeQXVyMTAyMzkxMzMw._V1_Ratio0.7568_AL_.jpg",
                        "title": "Hannah Ha Ha",
                        "description": "2022 Betsey Brown, Peter Cole"
                      },
                      {
                        "id": "tt0278200",
                        "resultType": "Title",
                        "image": "",
                        "title": "Hannah",
                        "description": "1980– TV Series Helen Ryan, Tim Pigott-Smith"
                      },
                      {
                        "id": "tt1127884",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BMTI4NDIwODE4Ml5BMl5BanBnXkFtZTYwNTI5Nzc4._V1_Ratio0.6757_AL_.jpg",
                        "title": "Hannah Montana and Miley Cyrus: Best of Both Worlds Concert",
                        "description": "2008 Miley Cyrus, The Jonas Brothers"
                      },
                      {
                        "id": "tt1478329",
                        "resultType": "Title",
                        "image": "https://m.media-amazon.com/images/M/MV5BYjBiOWUyZTMtODY1YS00YzZiLThjZjctNTNlYWFlZTM5MjkwXkEyXkFqcGdeQXVyNTk1ODg5ODA@._V1_Ratio0.7027_AL_.jpg",
                        "title": "That's So Suite Life of Hannah Montana",
                        "description": "2007 Video Orlando Brown, Frances Callier"
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
                    "url": "https://imdb-api.com/en/API/SearchTitle/k_842mh260/hannah"
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

    // async function fetchIsAlreadyPresentInUser(results){
    //     const loginToken = getLoginToken();
    //     console.debug(results);
    //     try {
    //         const result = await axios.get(`http://localhost:7777/users/${loginToken}`)
    //             .then(res => {
    //                 const userMedia = res.data.users_list.mediaList
    //                 results.forEach( m => {
    //                     userMedia.forEach( um => {
    //                         if (m.name === um.name){
    //                             console.debug(m, um, "same");
    //                         }
    //                     });
    //                 });
    //                 return results;
    //             })
    //             .then(res => console.debug("final", res));
    //         return result;
    //     } catch (error) {
    //         console.debug("error", error);
    //         return false;
    //     }
    // }

    useEffect(() => {
        const name = queryParameters.get('name');
        if (name) {
            fetchSearch(name)
                // .then(res => fetchIsAlreadyPresentInUser(res))
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
      <div className="my-shows-text">Search Results</div>
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
