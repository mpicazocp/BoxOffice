import React from 'react'
import "./SearchBar.css"

function SearchBar(props){

    const { search, setSearch } = props;

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    return(
        <div className = "SearchBarParent">
            <input className = "SearchBar"
                type="search"
                placeholder="Search"
                onChange={handleChange}
                value={search}
            />
        </div>
    )};
    
    export default SearchBar;
