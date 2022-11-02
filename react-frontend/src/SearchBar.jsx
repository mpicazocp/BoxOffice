import React, {useState} from 'react'
import "./SearchBar.css"


function SearchBar(){

    // const searchBar = () => {};
    const [searchInput, setSearchInput] = useState("");

    const MediaList = []; // do we want this as movie list and show list? or all one


    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        MediaList.filter((media) => media.name.match(searchInput));
    }

    return(
    <div className = "SearchBarParent">
        
        <input className = "SearchBar"
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput} />
        
        <table>
            
            {MediaList.map((media) => 
                <div>
                    <tr>
                    <td>{media.name}</td>
                    <td>{media.genre}</td>
                    </tr>
                </div>
                )}
        </table>
    </div>
    )};
    
    export default SearchBar;