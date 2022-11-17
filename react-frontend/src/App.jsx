import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AccountCreation from './AccountCreation';
import LoginPage from './LoginPage';
import HomePage from "./HomePage";
import MyShows from "./MyShows";
import AddMedia from "./AddMedia";

function App() {

  return (
    <div className='App'>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/newAccount' element={<AccountCreation />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/myShows' element={<MyShows />} />
          <Route path='/addMedia' element={<AddMedia title = "Shrek" img="https://upload.wikimedia.org/wikipedia/en/7/7b/Shrek_%282001_animated_feature_film%29.jpg" desc="swamp swampswamp swampswamp swampswamp swampswamp swampswamp swampswamp swampswamp swampswamp swampswamp swampswamp swampswamp swamp"/>} />
          <Route path='/addMedia1' element={<AddMedia title = "Shrek" img="https://upload.wikimedia.org/wikipedia/en/7/7b/Shrek_%282001_animated_feature_film%29.jpg" desc="swamp" streamingService="Netflix" isMovie currentHours={1} currentMinuites={13}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
