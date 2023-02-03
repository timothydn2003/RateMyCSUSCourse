import { FormControl, TextField } from '@mui/material';
import React from 'react';
import "../App.css"
import Navigation from '../Components/Navigation';
import { useState,useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Col, Row } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppContext } from '../App';
import { auth } from "../firebase-config"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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

const Home = () => {
    const {signedIn, setSignedIn} = useContext(AppContext)
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [falseRegister, setfalseRegister] = useState(true)
    const [falseSignIn, setFalseSignIn] = useState(true)

    //MODAL
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setFalseSignIn(true)
    }
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => {
        setOpen2(false)
        setfalseRegister(true)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const switchModal = () => {
        handleClose()
        handleOpen2()
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
            createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            .then(() => {
               alert('Registered!')
               setfalseRegister(true)
               handleClose2()
            }).catch((error) => {
                console.log(error.message)
            })
        }else{
            setfalseRegister(false)
        }
       
    }
    const stop = (event) => {
        event.preventDefault()
    }

    return(
        <div>
            <Navigation open = {handleOpen} signedIn = {signedIn} logout = {logout} open2 = {handleOpen2}/>
        <div className="home-page">
            <div className='home-page-input'>
                <h2 className='home-page-logo'><b>RateMyCSUSCourse | Computer Science</b></h2>
                <input placeholder='Search for a class' className='home-page-search'/>
            </div>
        </div>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='modal-content'>
            <h5 className='login-title'>Login to leave a review!</h5>
            <form className='login-form' onSubmit={stop}>
                <Row>
                    <Col>
                        <TextField  sx={{ m: 1, width: '25ch' }} id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} required/>
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
                                required
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
        </Modal>
        <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
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
        </Modal>
        </div>
       
    )
}
export default Home