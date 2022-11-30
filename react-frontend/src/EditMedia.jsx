import React, {useState} from 'react'
import Select from 'react-select'

import useLoginToken from './useLoginToken';

import "./EditMedia.css"

function AddMedia (props) {

    // assign media object params to props and useState to hold these values
    const { id, name, img, desc, streamingService, contentType, currentSeason, currentEpisode, currentHours, currentMinutes, closeModalAndSave, closeModalAndDelete, isMyShow } = props;
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
    // determine whether a user is logged in or not using session stored data
    const { getLoginToken } = useLoginToken();
    const loginToken = getLoginToken();

    // function to ensure that the media object is valid
    const validateMedia = () => {
        if (media.contentType === undefined) return false;
        if (media.contentType === "Movie"){
            if (streamingService === media.streamingService && contentType === media.contentType && currentHours === media.currentHours && currentMinutes === media.currentMinutes) return false;
            return Object.keys(media).every(key => (media[key] !== undefined && media[key] !== "") || (key === "currentSeason" || key === "currentEpisode"));
        }
        if (streamingService === media.streamingService && contentType === media.contentType &&
            currentHours === media.currentHours && currentMinutes === media.currentMinutes &&
            currentSeason === media.currentSeason && currentEpisode === media.currentEpisode
        ) return false;
        return Object.keys(media).every(key => media[key] !== undefined && media[key] !== "");
    }

    // if media is valid: submit
    const submitNewMedia = () => {
        if (!validateMedia()) return;
        if (media.contentType === "Movie"){
            media.currentSeason = null;
            media.currentEpisode = null;
            if (Number.isNaN(media.currentHours) || Number.isNaN(media.currentMinutes)) return;
        }
        else if (Number.isNaN(media.currentSeason) || Number.isNaN(media.currentEpisode) || Number.isNaN(media.currentHours) || Number.isNaN(media.currentMinutes)) return;
        media.id = id;
        closeModalAndSave(media);
    }

    // delete the media object from the currently logged in user's shows
    const deleteMedia = () => {
        media.id = id;
        closeModalAndDelete(media);
    }

    function infoText() {
        return (
            <div className="show-info-text">
                <div className="show-info-detail-title">Name: <div className="show-info-detail">{media.name}</div></div>
                <div className="show-info-detail-title">Desc: <div className="show-info-detail">{media.desc}</div></div>
                { loginToken !== null && 
                <div className="show-information-detail-text">
                    <div className="show-info-detail-title">Streaming Service:
                        <input
                            className="edit-media-streaming-service-select"
                            defaultValue={ media.streamingService !== undefined ? media.streamingService : ""}
                            onChange={ e => setMedia({...media, streamingService: e.target.value})}
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
                                    <input className={!Number.isNaN(media.currentSeason) ? "editMediaInput" : "editMediaInputError" } placeholder="Season" defaultValue={!Number.isNaN(media.currentSeason) ? media.currentSeason : null} onChange={e => setMedia({...media, currentSeason: Number(e.target.value, 10)})} />
                                </div>}
                            {media.contentType === "Series" &&
                                <div className="editMediaShowTime">Episode
                                    <input className={!Number.isNaN(media.currentEpisode) ? "editMediaInput" : "editMediaInputError"} placeholder="Episode" defaultValue={media.currentEpisode} onChange={e => setMedia({...media, currentEpisode: Number(e.target.value, 10)})} />
                                </div>}
                            <div className="editMediaShowTime">Hours<input className={!Number.isNaN(media.currentHours) ? "editMediaInput": "editMediaInputError"} placeholder="Hours" defaultValue={media.currentHours} onChange={e => setMedia({...media, currentHours: Number(e.target.value, 10)})} /></div>
                            <div className="editMediaShowTime">Minutes<input className={!Number.isNaN(media.currentMinutes) ? "editMediaInput" : "editMediaInputError"} placeholder="Minutes" defaultValue={media.currentMinutes} onChange={e => setMedia({...media, currentMinutes: Number(e.target.value, 10)})} /></div>
                        </div>
                        }
                    </div>
                </div>
                }
            </div>
        );
    };

    return (
        <div className="show-info-parent">
            <div className="image-and-button">
                <img src={media.img} alt={media.name} className="show-info-img"/>
                { loginToken !== null &&
                    <button
                        className={ validateMedia() ? "save-button": "save-button-error"}
                        type="submit"
                        onClick={submitNewMedia}
                    >
                        Save
                    </button>
                }
            </div>
            {infoText()}
            { loginToken !== null && isMyShow !== undefined && <button type="button" className="my-shows-delete" onClick={deleteMedia}>delete</button> }
        </div>
    );
}

export default AddMedia;
