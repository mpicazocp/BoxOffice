import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import "./HomePage.css"


function HomePage() {

    const SearchButtonSubmit = () => {
        console.debug("Congrats!");
    };
    const LoginButtonSubmit = () => {
        console.debug("Congrats!");
    };
    const CreateAccountButtonSubmit = () => {
        console.debug("Congrats!");
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
                <SearchBar/>
                <button className="searchButton" type="submit" onClick={SearchButtonSubmit}>SEARCH</button>
            </div>
          
        </div>
    );
}
export default HomePage;
