import React from "react"
import Navigation from "../Components/Navigation"
import { useState, useContext } from "react"
import { AppContext } from "../App"
import { Col, Container, Row } from "react-bootstrap"
import { Button, LinearProgress, TextField } from "@mui/material"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../firebase-config"
import { useNavigate } from "react-router-dom"

const AddReview = () => {
    //Information for Review Submission
    const {classObject, email} = useContext(AppContext)
    const [review,setReview] = useState('')
    const [position, setPosition] = useState('')
    const [professor, setProfessor] = useState('')
    const [semester, setSemester] = useState('')
    const [rating, setRating] = useState('')
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    //Loading animation trigger
    const [loading, setLoading] = useState(false)
    const [filled, setFilled] = useState(true)
    //Reference for databse
    const reviewsCollectionRef = collection(db, "Classes", `${classObject.id}`,"Reviews")
    
    //Navigation
    const navigate = useNavigate();

    //Dropdown menu
    const handleChange = (event) => {
        setRating(event.target.value);
    };
    const handleChange2 = (event) => {
        setPosition(event.target.value);
    };
    //Submit form
    const submitReview = () => {
        setFilled(true)
        if(professor !== '' && semester !== '' && review !== false && rating !== ''){
            setLoading(true)
            addDoc(reviewsCollectionRef, {review: review, email: email, position: position, professor: professor, semester: semester, date: date, likes: 0})
            .then(() => {
                setLoading(false)
                alert('Review Added')
                navigate('/')
            }).catch((error) => {
                console.log(error)
            })
        }else{
            setFilled(false)
        }
    }
    const stop = (event) => {
        event.preventDefault()
    }
    return(
        <div className="addreview-page">
            {loading?
            <Box sx={{ width: '100%', zIndex: '1300' }}>
                <LinearProgress color = "success"/>
            </Box>: 
            ""}
            <Navigation/>
            <div className="addreview-body">
                <div className="addreview-form">
                    <form onSubmit={stop}>
                        <h6>Add a review for: {classObject.name}</h6>
                        <Container style={{width: '600px'}}>
                            <Row>
                                <Col>
                                    <TextField sx={{width: '25ch'}} id="outlined-basic" label="Professor" variant="outlined" onChange={(e) => setProfessor(e.target.value)} required/>
                                </Col>
                                <Col>
                                    <Box>
                                        <FormControl sx={{width: '25ch'}}>
                                            <InputLabel id="demo-simple-select-label">Difficulty Rating</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={rating}
                                            label="Difficulty Rating"
                                            onChange={handleChange}
                                            >
                                            <MenuItem value={1}>1 - Easy</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5 - Hard</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Box>
                                        <FormControl sx={{width: '25ch', marginTop: '20px'}}>
                                            <InputLabel id="demo-simple-select-label">Current student, alumni or professor?</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={position}
                                            label="Are you a current student, alumni or professor?"
                                            onChange={handleChange2}
                                            >
                                            <MenuItem value={'Current Student'}>Current Student</MenuItem>
                                            <MenuItem value={'Alumni'}>Alumni</MenuItem>
                                            <MenuItem value={'Professor'}>Professor</MenuItem> 
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Col>
                                <Col>
                                    <TextField sx={{width: '25ch', marginTop: '20px'}} id="outlined-basic" label="Semester taken" variant="outlined" onChange={(e) => setSemester(e.target.value)} required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={4}maxRows={8} style = {{width: '55ch', marginTop: '20px'}} onChange={(e) => setReview(e.target.value)} required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type="submit" onClick={submitReview} style={{marginTop: '20px'}}>Submit Review</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {filled?"":<h6 style={{ color: 'red', marginTop: '10px' }}>*Please fill in all fields*</h6>}
                                </Col>
                            </Row>
                        </Container>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default AddReview