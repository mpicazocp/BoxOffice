import React from 'react'
import "./SearchBar.css"


function SearchBar(props){

    const { searchInput, setSearchInput } = props;

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    return(
        <div className = "SearchBarParent">
            <input
                className = "SearchBar"
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
            />
        </div>
    )};
    
    export default SearchBar;
