import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ShowInformation from './ShowInformation'

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/sunny' element={
            <ShowInformation 
              name="Always Sunny"
              img="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/IASIPTC.svg/1200px-IASIPTC.svg.png"
              rating="R"
              streamingService="Hulu"
              currentEpisode={4}
              currentSeason={3}
              currentTime={23}
              totalTime={45}
              desc="Very wacky adventures"
            />
          } />
          <Route path='/shrek' element={
            <ShowInformation 
              name="Shrek"
              img="https://upload.wikimedia.org/wikipedia/en/7/7b/Shrek_%282001_animated_feature_film%29.jpg"
              rating="PG-13"
              streamingService="Peacock"
              isMovie
              currentTime={10}
              totalTime={100}
              desc="Very swampy adventures"
            />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
