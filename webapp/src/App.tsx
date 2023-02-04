import './assets/styles/App.css'
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Google from './pages/Google';
import GooglResult from './pages/GoogleResult';
import PageResult from './pages/PageResult';
import TextResult from './pages/TextResult';
import Navbar from './components/navbar';
import IUserContext from './interfaces/usercontext.interface';

const context: IUserContext = {
  navbar: {state: '', setState: () => null}
};

const UserContext = React.createContext(context);

function App() {

  const [navState, setNavState] = useState('Google');

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{navbar: {state: navState, setState: setNavState}}}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Google />} />
            <Route path='/result-google' element={<GooglResult />} />
            <Route path='/result-page' element={<PageResult />} />
            <Route path='/result-text' element={<TextResult />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export { UserContext };
export default App
