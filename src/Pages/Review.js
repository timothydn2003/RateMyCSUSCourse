import Navigation from "../Components/Navigation"
import React from 'react';
import { useContext, useState, useEffect } from "react"
import { AppContext } from '../App';
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from "../firebase-config"
import { Col, Container, Row } from "react-bootstrap";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "../App.css"
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const {classObject, email, signedIn} = useContext(AppContext)
    const reviewsCollectionRef = collection(db, "Classes", `${classObject.id}`,"Reviews")
    const [reviews,setReviews] = useState([])
    const [requestID, setRequestID] = useState('')
    const [requestName, setRequestName] = useState('')
    const [loading,setLoading] = useState(false)
    const [success, setSuccesss] = useState(false)
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
        setSuccesss(false)
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

                setSuccesss(true)
                setRequestName('')
                setRequestID('')
            }).catch((error) => {
                console.log(error)
            })
        }else{
            setNotFilled(true)
        }
        
    }
    const closeModal = () => {
        handleClose()
        navigate('/')
    }
    const stop = (event) => {
        event.preventDefault()
    }
    return(
        <div className="review-page">
            <Navigation/>
          {Object.keys(classObject).length>0
          ?<div className="review-body">
            <Container>
                <Row>
                    <Col style={{justifyContent: "start", display: "flex"}}>
                        <button className="back-btn">back</button>
                    </Col>
                   {signedIn?
                   <Col style={{justifyContent: "end", display: "flex"}}>
                       <button onClick={() => navigate('/addReview')} style = {{marginRight: "2vh"}} className = 'addReview-btn' >Add a Review</button>
                       <button className = 'addReview-btn'>Upload a file</button>
                    </Col>
                    :<Col><h6 style={{justifyContent: "end", display: "flex" }}>Sign in to leave a review!</h6></Col>}
                </Row>
                <Row>
                <Col md = '6' style={{justifyContent: "start", display: "flex"}}>
                    <div className="review-header">
                        <Row>
                            <Col md = '12'>
                                <h5>{classObject.name}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col md = '12'>
                            <p className="course-description">{classObject.description}</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md= '6'>
                {reviews.map((data) => {
                        return(
                           <Row>
                            <Col md = '12' >
                                <div className="review-card">
                                    <div className="review-data" >
                                        <Row>
                                            <Col md='3' sm = '4'>
                                                <div className="rating-card">
                                                    <h4>Rating:</h4>
                                                    <h5>{data.rating}</h5></div>
                                            </Col>
                                            <Col md="9" sm = '8'>
                                                <Row>
                                                    <Col>
                                                        {data.date}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        Professor {data.professor}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                    Semester taken: {data.semester}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        {data.position}
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
                            </Col>
                           </Row>
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
                    {success?<Row>
                        <Col>
                            <div>
                                <Alert severity="success" style={{ width: '30ch', margin: '10px auto 0 auto'}}>Request Submitted!
                                    <p style={{display: "inline"}}>
                                        <button onClick={closeModal} style={{ backgroundColor: "transparent", border: "none", color: "green"}} ><HighlightOffIcon style={{width: '20px'}}/></button>
                                    </p>
                                </Alert>
                            </div>
                        </Col>
                    </Row>:""}
                    {loading?
                    <Row>
                        <Col>
                            <CircularProgress color="success" style={{marginTop: '10px'}}/>
                        </Col>
                    </Row>
                    :""}
                    <Row>
                        <Col>
                            {notFilled? <h6 style={{color: "red", marginTop: "10px"}}>*Please fill out all fields or sign in*</h6>: ""}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={submitRequest}>Submit</Button>
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