import React from 'react';
import "../App.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import Modal from '@mui/material/Modal';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import { Col, Row } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth } from "../firebase-config"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Alert, CircularProgress, FormControl, TextField } from '@mui/material';
import { AppContext } from '../App';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from "react-router-dom"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Navigation = () => {
    const {setSignedIn, email, setEmail, password, setPassword, setClassObject, signedIn} = useContext(AppContext)
    const [showPassword, setShowPassword] = React.useState(false);
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [falseRegister, setfalseRegister] = useState(true)
    const [falseSignIn, setFalseSignIn] = useState(true)

    //MODAL
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setFalseSignIn(true)
    }
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => {
        setSuccess(false)
        setOpen2(false)
        setfalseRegister(true)
    }
    const [loading, setLoading] = useState(false)
    const [success,setSuccess] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const switchModal = () => {
        handleClose()
        handleOpen2()
    }
    const stop = (event) => {
        event.preventDefault()
    }

    //AUTH
    const signIn = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then(() => {
          setSignedIn(true)
          setFalseSignIn(true)
          handleClose()
        }).catch((error) => {
          setFalseSignIn(false)
        })
      }
      const logout = () => {
          setSignedIn(false)
          setEmail('')
          setPassword('')
      }
      const register = () => {
          if(registerEmail.includes('@csus.edu')){
                setLoading(true)
                createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
                .then(() => {
                    setfalseRegister(true)
                    setLoading(false)
                    setSuccess(true)
                }).catch((error) => {
                    alert('Email already in use.')
                })
          }else{
              setfalseRegister(false)
          }
      }

      //Reset class object when returning back to home page
      const reset = () => {
        setClassObject({})
      }
    return(
        <div>
        <Navbar collapseOnSelect expand="lg" >
            <Container fluid>
                <LinkContainer to={'/'} onClick = {reset}><Navbar.Brand><b><h3 className='logo'><b>RateMy<span className='logo-csus'>CSUS</span>Course</b></h3></b></Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    
                </Nav>
                <Nav>
                {signedIn? <Nav.Link style={{paddingTop: '0px', paddingBottom: '0px'}}><button className='login-btn' onClick={logout}><p className='nav-links'><b>Sign Out</b></p></button></Nav.Link>: 
                    <div className='nav-signin'>
                        <Nav.Link style={{paddingTop: '0px', paddingBottom: '0px'}}><button className='login-btn' onClick={handleOpen}><p className='nav-links'><b>Log In</b></p></button></Nav.Link>
                        <Nav.Link style={{paddingTop: '0px', paddingBottom: '0px'}} eventKey={2}><button className='signup-btn' onClick={handleOpen2}><p className='nav-links2'><b>Sign Up</b></p></button></Nav.Link>

                    </div>
                }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in = {open}>
        <Box sx={style}>
          <div className='modal-content'>
            <h5 className='login-title'>Login to leave a review!</h5>
            <form className='login-form' onSubmit={stop}>
                <Row>
                    <Col>
                        <TextField  sx={{ m: 1, width: '25ch' }} id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormControl sx={{ m: 1, width: '25ch', marginTop: '10px'}} variant="filled">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                onChange={(e) => setPassword(e.target.value)}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"

                            />
                        </FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {falseSignIn?"":<h6 style={{color: 'red', paddingTop: '20px'}}>*Incorrect Email or Password*</h6>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={signIn} className='signin-btn'>Sign In</button>
                    </Col>
                </Row>
            </form>
            <h6 className='signup-text'>Dont have an account?<button onClick={switchModal} className='signup-modal-btn'>Sign Up!</button></h6>
          </div>
         
        </Box>
        </Fade>
        </Modal>
        <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            >
            <Fade in = {open2}>
            <Box sx={style}>
            <div className='modal-content'>
                <h5 className='login-title'>Register your account!</h5>
                <form className='login-form' onSubmit={stop}>
                    <Row>
                        <Col>
                            <TextField  sx={{ m: 1, width: '25ch' }} id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setRegisterEmail(e.target.value)} required/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormControl sx={{ m: 1, width: '25ch', marginTop: '10px'}} variant="filled">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    required
                                />
                            </FormControl>
                        </Col>
                    </Row>
                    {success?<Row>
                        <Col>
                            <div>
                                <Alert severity="success" style={{ width: '30ch', margin: '10px auto 0 auto'}}>Registered!
                                    <p style={{display: "inline"}}>
                                        <button onClick={handleClose2} style={{ backgroundColor: "transparent", border: "none", color: "green"}} ><HighlightOffIcon style={{width: '20px'}}/></button>
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
                    : ""}

                    <Row>
                        <Col>
                            {falseRegister?"":<h6 style={{color: 'red', paddingTop: '20px'}}>*Please use a CSUS email!*</h6>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button onClick={register} className='signin-btn'>Sign In</button>
                        </Col>
                    </Row>
                </form>
                
            </div>
            
            </Box>
            </Fade>
        </Modal>
        </div>
  );
}
export default Navigation