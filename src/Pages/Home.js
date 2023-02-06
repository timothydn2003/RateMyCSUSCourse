import React from 'react';
import "../App.css"
import Navigation from '../Components/Navigation';
import { useState,useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { db } from "../firebase-config"
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const { setClassObject } = useContext(AppContext)
    const [classNum,setClassNum] = useState('')
    const [classes, setClasses] = useState([])
    const classesCollectionRef = collection(db, "Classes")
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async() => {
            const data = await getDocs(classesCollectionRef)
            setClasses(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getData()
    },[classesCollectionRef])
    
    const search = () => {
        setClassObject({})
        classes.map((data) => {
            if(classNum.toLowerCase() === data.id.toLowerCase()){
                setClassObject(data)
            }
        })
        navigate('/classReviews')
        
    }
    const stop = (event) => {
        event.preventDefault()
    }

    return(
        <div>
            <Navigation/>
        <div className="home-page">
            <div className='home-page-input'>
                <h2 className='home-page-logo'><b>RateMyCSUSCourse | Computer Science</b></h2>
                <form onSubmit={stop}>
                    <input type='text' placeholder='Search for a class' className='home-page-search' onChange={(e) => setClassNum(e.target.value)} required/>
                    <button type = "submit" onClick={search} className = 'search-btn'>Search</button>
                </form>
            </div>
        </div>
        </div>
       
    )
}
export default Home