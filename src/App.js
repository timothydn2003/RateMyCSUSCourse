import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState,createContext } from 'react';

export const  AppContext = createContext();
function App() {
  const[signedIn, setSignedIn] = useState(false)
  return (
    <div className="App">
      <AppContext.Provider value = {{signedIn, setSignedIn}}>
        <BrowserRouter>
          <Routes>
            <Route path = {'/'} element = {<Home/>}/>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
