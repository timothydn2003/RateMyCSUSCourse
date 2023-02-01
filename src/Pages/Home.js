import { TextField } from '@mui/material';
import React from 'react';
import "../App.css"
const Home = () => {
    return(
        <div className="home-page">
            <div className='home-page-input'>
                <h2 className='home-page-logo'><b>RateMyCSUSCourse | Computer Science</b></h2>
                <input placeholder='Search for a class' className='home-page-search'/>
            </div>
        </div>
    )
}
export default Home