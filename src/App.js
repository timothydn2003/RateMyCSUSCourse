import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState,createContext } from 'react';
import Review from './Pages/Review';

export const  AppContext = createContext();
function App() {
  const[signedIn, setSignedIn] = useState(false)
  const [classObject, setClassObject] = useState([]);
  return (
    <div className="App">
      <AppContext.Provider value = {{signedIn, setSignedIn, classObject, setClassObject}}>
        <BrowserRouter>
          <Routes>
            <Route path = {'/'} element = {<Home/>}/>
            <Route path= {'/classReviews'} element = {<Review/>}/>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
