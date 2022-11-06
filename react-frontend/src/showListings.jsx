import React from 'react';
import { Placeholder } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./showListings.css"

function ListingsPage(){

    // mediaList = [["Movie1", "desc1"], ["movie2", "desc2"]]

    const { Paragraph } = Placeholder;

    const HomeButtonSubmit = () => {
        console.debug("Congrats!");
    };

    return (
        <div className="listings-page-parent">
            <button className="homeButton" type="submit" onClick={HomeButtonSubmit}>HOME</button>
            <h1 className= "header">Results</h1>
            <div className= "listings" style={{ marginTop: 20, width: 800 }}>
                <Paragraph style={{ marginTop: 30 }} 
                            graph="image" rows={3} />
                <Paragraph style={{ marginTop: 40 }} 
                            graph="image" rows={3} />
                <Paragraph style={{ marginTop: 40 }} 
                            graph="image" rows={3} />
            </div>
        </div>
    );

}
export default ListingsPage;