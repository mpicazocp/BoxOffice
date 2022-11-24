import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SearchBar from './SearchBar';
import "./HomePage.css"


function HomePage() {

    const navigate = useNavigate();

    const [ loggedIn, setLoggedIn] = useState(false);
    const [ search, setSearch ] = useState("");

    useEffect(() => {
        setLoggedIn(sessionStorage.getItem('email') !== null);
    }, [])

    const SearchButtonSubmit = () => {
        if (search !== "") navigate(`/search?name=${search}`);
    };

    const logoutButtonSubmit = () => {
        setLoggedIn(false);
        sessionStorage.clear();
    };

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
