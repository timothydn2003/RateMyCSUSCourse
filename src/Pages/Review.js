import Navigation from "../Components/Navigation"
import React from 'react';
import { useContext, useState, useEffect } from "react"
import { AppContext } from '../App';
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from "../firebase-config"
import { Col, Container, Row } from "react-bootstrap";
import { Button, LinearProgress, TextField } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../App.css"
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const {classObject, email, signedIn} = useContext(AppContext)
    const reviewsCollectionRef = collection(db, "Classes", `${classObject.id}`,"Reviews")
    const [reviews,setReviews] = useState([])
    const [requestID, setRequestID] = useState('')
    const [requestName, setRequestName] = useState('')
    const [loading,setLoading] = useState(false)
    const [notFilled, setNotFilled] = useState(false)
    const requestsCollectionRef = collection(db, "Requests")
    const navigate = useNavigate();


    useEffect(() => {
        const getReviews = async() => {
            const data = await getDocs(reviewsCollectionRef)
            setReviews(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getReviews()
    },[reviewsCollectionRef])

    //MODAL
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNotFilled(false)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    //Submitting a request
    const submitRequest = () => {
        setNotFilled(false)
        if(signedIn === true && requestID !== '' && requestName !== ''){
            setLoading(true)
            addDoc(requestsCollectionRef, {requestID: requestID, email: email, requestName: requestName})
            .then(() => {
                setLoading(false)
                alert('Request submitted!')
                setRequestName('')
                setRequestID('')
                navigate('/')
            }).catch((error) => {
                console.log(error)
            })
        }else{
            setNotFilled(true)
        }
        
    }
    const stop = (event) => {
        event.preventDefault()
    }
    return(
        <div className="review-page">
            {loading?
            <Box sx={{ width: '100%', zIndex: '1300' }}>
                <LinearProgress color = "success"/>
            </Box>: 
            ""}
            <Navigation/>
          {Object.keys(classObject).length>0
          ?<div className="review-body">
            <Container>
                <Row>
                   {signedIn?
                   <Col style={{justifyContent: "end", display: "flex"}}>
                       <button onClick={() => navigate('/addReview')} style = {{marginRight: "2vh"}} className = 'addReview-btn' >Add a Review</button>
                       <button className = 'addReview-btn'>Upload a file</button>
                    </Col>
                    :<h6 style={{marginBottom: "5vh", justifyContent: "end", display: "flex" }}>Sign in to leave a review!</h6>}
                </Row>
                <Row>
                <Col md = '6' xs = '12'>
                    <div className="review-header">
                        <Row>
                            <Col>
                                <h5>{classObject.name}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <p className="course-description">{classObject.description}</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md= '6' xs = '12'>
                {reviews.map((data) => {
                        return(
                           <div className="review-card">
                                <div className="review-data">
                                    <Row>
                                        <Col md='3'>
                                            <div className="rating-card">
                                                <h4>Rating:</h4>
                                                <h5>{data.rating}</h5></div>
                                        </Col>
                                        <Col md="9">
                                            <Row>
                                                <Col>
                                                    {data.date}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {data.position}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                Semester taken: {data.semester}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p className="review-paragraph" >{data.review}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                           </div>
                        )
                    })}
                </Col>
                </Row>
            </Container>
          </div>
          :<h6>Class not found. Request to have a class added<button onClick={handleOpen} className="request-btn">here.</button></h6>}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <div className="modal-content">
                <form onSubmit={stop}>
                    <Row>
                        <h6>Request to add a course</h6>
                    </Row>
                    <Row>
                        <Col>
                            <TextField sx={{ m: 1, width: '25ch' }} id="outlined-basic" label="Course ID" variant="outlined" onChange = {(e) => setRequestID(e.target.value)} required/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextField sx={{ m: 1, width: '25ch' }} id="outlined-basic" label="Course Name" variant="outlined" onChange = {(e) => setRequestName(e.target.value)} required/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={submitRequest}>Submit</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {notFilled? <h6 style={{color: "red", marginTop: "10px"}}>*Please fill out all fields or sign in*</h6>: ""}
                        </Col>
                    </Row>
                </form>
            </div>
            
            </Box>
        </Modal>
        </div>
    )
}

export default Review