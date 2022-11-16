import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import "./ShowListing.css"

function ShowListing(){

    const [medias, setMedias] = useState([]);
    const queryParameters = new URLSearchParams(window.location.search)

    const HomeButtonSubmit = () => {
        console.debug("Congrats!");
    };

    const parseAPI = (response) => {
        const temp = [];
        response.forEach( res => {
            console.debug(res)
            temp.push(res);
        });
        setMedias(temp);
    };

      const fetchData = async (name) => {
        // const requestOptions = {
        //   method: 'GET',
        //   redirect: 'follow'
        // };
        try {
          const response = {
              "searchType": "Title",
              "expression": name,
              "results": [
                {
                  "id": "tt0126029",
                  "resultType": "Title",
                  "image": "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.7273_AL_.jpg",
                  "title": "Shrek",
                  "description": "(2001)"
                },
                {
                  "id": "tt0298148",
                  "resultType": "Title",
                  "image": "https://m.media-amazon.com/images/M/MV5BMDJhMGRjN2QtNDUxYy00NGM3LThjNGQtMmZiZTRhNjM4YzUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.7273_AL_.jpg",
                  "title": "Shrek 2",
                  "description": "(2004)"
                },
                {
                  "id": "tt0413267",
                  "resultType": "Title",
                  "image": "https://m.media-amazon.com/images/M/MV5BOTgyMjc3ODk2MV5BMl5BanBnXkFtZTcwMjY0MjEzMw@@._V1_Ratio0.7273_AL_.jpg",
                  "title": "Shrek the Third",
                  "description": "(2007)"
                },
                {
                  "id": "tt0892791",
                  "resultType": "Title",
                  "image": "https://m.media-amazon.com/images/M/MV5BMTY0OTU1NzkxMl5BMl5BanBnXkFtZTcwMzI2NDUzMw@@._V1_Ratio0.7273_AL_.jpg",
                  "title": "Shrek Forever After",
                  "description": "(2010)"
                },
                {
                  "id": "tt3070936",
                  "resultType": "Title",
                  "image": "https://m.media-amazon.com/images/M/MV5BN2U4YzBhNmYtNzAxZS00ZjcyLTg5NDEtMDM4ODVkMTZlZmNkXkEyXkFqcGdeQXVyNzMwOTY2NTI@._V1_Ratio0.7273_AL_.jpg",
                  "title": "Shrek the Musical",
                  "description": "(2013)"
                },
                {
                  "id": "tt0897387",
                  "resultType": "Title",
                  "image": "https://m.media-amazon.com/images/M/MV5BZDE0NGZkOGMtNGY4My00OTM4LTliM2MtM2Y5OTVjOTFmNTA5XkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_Ratio0.7273_AL_.jpg",
                  "title": "Shrek the Halls",
                  "description": "(2007) (TV Short)"
                },
                {
                  "id": "tt10167324",
                  "resultType": "Title",
                  "image": "https://m.media-amazon.com/images/M/MV5BMmVkNDkwNjktODBjYi00MTczLTgzNTctZTIxNTYxNjYyMzE5XkEyXkFqcGdeQXVyNjAyNTUxMzA@._V1_Ratio1.0000_AL_.jpg",
                  "title": "Shrek is Love, Shrek is Life",
                  "description": "(2014) (Video)"
                },
                {
                  "id": "tt9334162",
                  "resultType": "Title",
                  "image": "https://m.media-amazon.com/images/M/MV5BZDY3ZDFjZWYtNDhmNC00OGVjLWIxZDYtNzlmYTAyYjMwNTcyXkEyXkFqcGdeQXVyNTk5NzczMDE@._V1_Ratio0.7273_AL_.jpg",
                  "title": "Shrek Retold",
                  "description": "(2018)"
                }
              ],
              "errorMessage": ""
            }
          return response.results;
        } catch(error) {
          console.error(error);
          return false;
        }
      };

    useEffect(() => {
        const name = queryParameters.get('name');
        fetchData(name).then( res =>
            parseAPI(res)
        );
    }, [])

    return (
        <div className="listings-page-parent">
            <h1 className= "header">
                <Link className="homeButton" type="submit" onClick={HomeButtonSubmit} to='/'>HOME</Link>
                <div className= "headerTxt">Search Results</div>
            </h1>
            {medias.map( m => <div key={m.title} className="listingParent">
                <img className="listingImage" src={m.image} alt={m.image}/>
                <div className="listingText">
                    <div> <b>Title: </b>{m.title} </div>
                    <div> <b>Desc:  </b>{m.description} </div>
                </div>
            </div>)}
        </div>
    );

}
export default ShowListing;
