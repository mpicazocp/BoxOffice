import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SearchBar from './SearchBar';
import "./HomePage.css"

function HomePage() {

    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

    const SearchButtonSubmit = () => {
        console.debug(searchInput);
        navigate(`/search?name=${searchInput}`);
    };
    const LoginButtonSubmit = () => {
        // console.debug("Congrats!");
    };
    const CreateAccountButtonSubmit = () => {
        // console.debug("Submitted!");
    };
    
    return (
        <div className="home-page-parent">
            <div className = "buttons">
                <button className="loginButton" type="submit" onClick={LoginButtonSubmit}>
                  <Link className="buttonText" to='/login'>LOGIN</Link>
                </button>
                <button className="createButton" type="submit" onClick={CreateAccountButtonSubmit}>
                  <Link className="buttonText" to='/newAccount'>CREATE ACCOUNT</Link>
                </button>
            </div>
            <div className="title"><span className="test">Box</span>Office</div>
            <div className = "searchbox">
                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
                <button className="searchButton" type="submit" onClick={SearchButtonSubmit}>SEARCH</button>
            </div>
          
        </div>
    );
}
export default HomePage;
