import React, {useState} from 'react'

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
    <div>
        <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput} />
        
        <table>
            <tr>
                <th>Media</th>
                <th>Media</th>
            </tr>
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