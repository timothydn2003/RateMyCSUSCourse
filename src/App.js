import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState,createContext } from 'react';
import Review from './Pages/Review';
import AddReview from './Pages/AddReview';

export const AppContext = createContext();
function App() {
  //variables needed throughout all components
  const [signedIn, setSignedIn] = useState(false)
  const [classObject, setClassObject] = useState({});
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <div className="App">
      <AppContext.Provider value = {{signedIn, setSignedIn, classObject, setClassObject, setEmail, email, password, setPassword}}>
        <BrowserRouter>
          <Routes>
            <Route path = {'/'} element = {<Home/>}/>
            <Route path= {'/classReviews'} element = {<Review/>}/>
            <Route path= {'/addReview'} element = {signedIn?<AddReview/>:<Home/>}/>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
