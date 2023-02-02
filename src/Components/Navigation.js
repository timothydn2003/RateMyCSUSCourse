import React from 'react';
import "../App.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { popoverClasses } from '@mui/material';

const Navigation = (props) => {
    return(
        <Navbar collapseOnSelect expand="lg" >
            <Container fluid>
                <Navbar.Brand><b><h3 className='logo'><b>RateMy<span className='logo-csus'>CSUS</span>Course</b></h3></b></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    
                </Nav>
                <Nav>
                    <Nav.Link><button className='login-btn' onClick={props.open}><p className='nav-links'><b>Sign In</b></p></button></Nav.Link>
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}
export default Navigation