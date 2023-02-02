import { FormControl, TextField } from '@mui/material';
import React from 'react';
import "../App.css"
import Navigation from '../Components/Navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Col, Row } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
    const [signedIn, setSignedIn] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <div>
            <Navigation open = {handleOpen}/>
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
            <form className='login-form'>
                <Row>
                    <Col>
                        <TextField  sx={{ m: 1, width: '25ch' }} id="outlined-basic" label="Email" variant="outlined" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormControl sx={{ m: 1, width: '25ch', marginTop: '10px'}} variant="filled">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
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
                        <button className='signin-btn'>Sign In</button>
                    </Col>
                </Row>
            </form>
            <h6 className='signup-text'>Dont have an account? Sign Up!</h6>
          </div>
         
        </Box>
      </Modal>
        </div>
       
    )
}
export default Home