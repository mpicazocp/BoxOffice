import React, {useState} from 'react'
import Select from 'react-select'

import "./AddMedia.css"

function AddMedia (props) {

    const { name, img, desc, streamingService, contentType, currentSeason, currentEpisode, currentHours, currentMinutes } = props;
    const [media, setMedia] = useState({
        name,
        img,
        desc,
        streamingService,
        contentType,
        currentSeason,
        currentEpisode,
        currentHours,
        currentMinutes
    });

    const streamingServices = ["Netflix", "Amazon", "Hulu"];

    const validateMedia = () => {
        if (media.contentType === undefined) return false;
        if (media.contentType === "Movie"){
            return Object.keys(media).every(key => (media[key] !== undefined && media[key] !== "") || (key === "currentSeason" || key === "currentEpisode"));
        }
        return Object.keys(media).every(key => media[key] !== undefined && media[key] !== "");
    }

    const submitNewMedia = () => {
        if (!validateMedia()) return;
        if (media.contentType === "Movie"){
            media.currentSeason = null;
            media.currentEpisode = null;
        }
        // Make API CALL
    }

    function infoText() {
        return (
            <div className="show-info-text">
                <div className="show-info-detail-title">Name: <div className="show-info-detail">{media.name}</div></div>
                <div className="show-info-detail-title">Desc: <div className="show-info-detail">{media.desc}</div></div>
                <div className="show-information-detail-text">
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
                                media.contentType !== undefined &&
                                (media.contentType === "Movie" ? {label: "Movie", value: "Movie"} : {label: "Series", value: "Series"})
                            }
                            options={["Movie", "Series"].map( v => ({"label" : v, "value" : v}))}
                            onChange={ e => setMedia({...media, contentType: e.value})}
                        />
                        { media.contentType !== undefined && 
                        <div className="editMediaTime">
                            {media.contentType === "Series" &&
                                <div className="editMediaShowTime">Season
                                    <input className="editMediaInput" placeholder="Season" defaultValue={media.currentSeason} onChange={e => setMedia({...media, currentSeason: e.target.value})} />
                                </div>}
                            {media.contentType === "Series" &&
                                <div className="editMediaShowTime">Episode
                                    <input className="editMediaInput" placeholder="Episode" defaultValue={media.currentEpisode} onChange={e => setMedia({...media, currentEpisode: e.target.value})} />
                                </div>}
                            <div className="editMediaShowTime">Hours<input className="editMediaInput" placeholder="Hours" defaultValue={media.currentHours} onChange={e => setMedia({...media, currentHours: e.target.value})} /></div>
                            <div className="editMediaShowTime">Minutes<input className="editMediaInput" placeholder="Minutes" defaultValue={media.currentMinutes} onChange={e => setMedia({...media, currentMinutes: e.target.value})} /></div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="show-info-parent">
            <div className="image-and-button">
                <img src={media.img} alt={media.name} className="show-info-img"/>
                <button
                    className={ validateMedia() ? "save-button": "save-button-error"}
                    type="submit"
                    onClick={submitNewMedia}
                >
                    { media.contentType === "Movie" ? "Add Movie" : "Add Series" }
                </button>
            </div>
            {infoText()}
        </div>
    );
}

export default AddMedia;
