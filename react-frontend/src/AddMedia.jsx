import React, {useState} from 'react'
import Select from 'react-select'

import "./AddMedia.css"

function AddMedia (props) {

    const { title, img, desc, streamingService, isMovie, currentSeason, currentEpisode, currentHours, currentMinuites } = props;
    const [media, setMedia] = useState({
        title,
        img,
        desc,
        streamingService,
        isMovie,
        currentSeason,
        currentEpisode,
        currentHours,
        currentMinuites
    });

    const streamingServices = ["Netflix", "Amazon", "Hulu"];

    const validateMedia = () => {
        if (media.isMovie === undefined) return false;
        if (media.isMovie){
            return Object.keys(media).every(key => (media[key] !== undefined && media[key] !== "") || (key === "currentSeason" || key === "currentEpisode"));
        }
        return Object.keys(media).every(key => media[key] !== undefined && media[key] !== "");
    }

    const submitNewMedia = () => {
        if (!validateMedia()) return;
        if (media.isMovie){
            media.currentSeason = null;
            media.currentEpisode = null;
        }
        // Make API CALL
    }

    return (
        <div className="show-info-parent">
            <div className="image-and-button">
                <img src={media.img} alt={media.title} className="show-info-img"/>
                { validateMedia() && <button className="save-button" type="submit" onClick={submitNewMedia}>{ media.isMovie ? "Add Movie" : "Add Series" }</button> }
            </div>
            <div className="show-info-text">
                <div className="show-info-detail-title">Name: <div className="show-info-detail">{media.title}</div></div>
                <div className="show-info-detail-title">Desc: <div className="show-info-detail">{media.desc}</div></div>
                <div className="testtest">
                    <div className="show-info-detail-title">Streaming Service:
                        <Select
                            className="edit-media-select"
                            defaultValue={ media.streamingService !== undefined && {label: media.streamingService, value: media.streamingService}}
                            isSearchable
                            options={streamingServices.map( v => ({"label" : v, "value" : v}))}
                            onChange={ e => setMedia({...media, streamingService: e.value})}
                        />
                    </div>
                    <div className="show-info-detail-title">Type of Media:
                        <Select
                            className="edit-media-select"
                            defaultValue={
                                media.isMovie !== undefined &&
                                (media.isMovie ? {label: "Movie", value: "Movie"} : {label: "Series", value: "Series"})
                            }
                            options={["Movie", "Series"].map( v => ({"label" : v, "value" : v}))}
                            onChange={ e => setMedia({...media, isMovie: e.value === "Movie"})}
                        />
                        { media.isMovie !== undefined && 
                        <div className="editMediaTime">
                            {!media.isMovie &&
                                <div className="editMediaShowTime">Season
                                    <input className="editMediaInput" placeholder="Season" defaultValue={media.currentSeason} onChange={e => setMedia({...media, currentSeason: e.target.value})} />
                                </div>}
                            {!media.isMovie &&
                                <div className="editMediaShowTime">Episode
                                    <input className="editMediaInput" placeholder="Episode" defaultValue={media.currentEpisode} onChange={e => setMedia({...media, currentEpisode: e.target.value})} />
                                </div>}
                            <div className="editMediaShowTime">Hours<input className="editMediaInput" placeholder="Hours" defaultValue={media.currentHours} onChange={e => setMedia({...media, currentHours: e.target.value})} /></div>
                            <div className="editMediaShowTime">Minuites<input className="editMediaInput" placeholder="Minuites" defaultValue={media.currentMinuites} onChange={e => setMedia({...media, currentMinuites: e.target.value})} /></div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMedia;
