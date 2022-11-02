import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AccountCreation from './AccountCreation';
import LoginPage from './LoginPage';

function App() {

  return (
    <div className='App'>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/newAccount' element={<AccountCreation />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
