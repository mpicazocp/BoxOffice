import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SearchBar from './SearchBar';
import "./HomePage.css"


function HomePage() {
    // navigate variable
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    // logged in variable used to decide which components to render
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        setLoggedIn(sessionStorage.getItem('id') !== null);
    }, [])

    // validates that the search is not empty and routes to the search result
    const SearchButtonSubmit = () => {
        if (search !== "") navigate(`/search?name=${search}`);
    };

    // if logging out, simply set the logged in variable back to false
    const logoutButtonSubmit = () => {
        setLoggedIn(false);
        sessionStorage.clear();
    };

    // simple navigate 
    const myShowsClicked = () => {
        navigate("/myShows");
    }
    
    return (
        <div className="home-page-parent">
            { loggedIn 
            ?   <div className = "buttons">
                    { loggedIn && <button type="button" className="myShowsButton" onClick={myShowsClicked} >My Shows</button> }
                    <button className="loginButton" type="submit" onClick={logoutButtonSubmit}>
                      <div className="buttonText" to='/'>LOGOUT</div>
                    </button>
                </div>
            :   <div className = "buttons">
                    <button className="loginButton" type="submit">
                      <Link className="buttonText" to='/login'>LOGIN</Link>
                    </button>
                    <button className="createButton" type="submit">
                      <Link className="buttonText" to='/newAccount'>CREATE ACCOUNT</Link>
                    </button>
                </div>
            }
            <div className="title"><span className="test">Box</span>Office</div>
            <div className = "searchbox">
                <SearchBar search={search} setSearch={setSearch}/>
                <button className="searchButton" type="submit" onClick={SearchButtonSubmit}><span className="buttonText" >SEARCH</span></button>
            </div>
          
        </div>
    );
}
export default HomePage;
