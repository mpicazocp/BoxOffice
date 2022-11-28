import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./SearchResults.css"

function SearchResults(){

    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location?.search)

    const [mediaResults, setMediaResults] = useState([]);

    async function fetchSearch(name) {
        try {
            const results = await axios.get(`http://localhost:5000/media?name=${name}`);
            return results?.data?.media_list;
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

    return (
       <div className="listings-page-parent">
            <div className="listings-page-header">
                <button className="homeButton" type="button" onClick={() => navigate("/")}><span className="my-shows-box">Box</span>Office</button>
                <div className= "headerTxt">Search Results</div>
            </div>
            {mediaResults.map( m => 
                <div key={m.name} className="listingParent">
                    <img className="listingImage" src={m.image} alt={m.image}/>
                    <div className="listingText">
                    <div> <b>Title: </b>{m.name} </div>
                </div>
            </div>)}
        </div>
    );

}
export default SearchResults;
