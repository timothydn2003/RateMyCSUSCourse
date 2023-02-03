import React from 'react';
import "../App.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = (props) => {
    return(
        <Navbar collapseOnSelect expand="lg" >
            <Container fluid>
                <LinkContainer to={'/'}><Navbar.Brand><b><h3 className='logo'><b>RateMy<span className='logo-csus'>CSUS</span>Course</b></h3></b></Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    
                </Nav>
                <Nav>
                {props.signedIn? <Nav.Link style={{paddingTop: '0px', paddingBottom: '0px'}}><button className='login-btn' onClick={props.logout}><p className='nav-links'><b>Sign Out</b></p></button></Nav.Link>: 
                    <div className='nav-signin'>
                        <Nav.Link style={{paddingTop: '0px', paddingBottom: '0px'}}><button className='login-btn' onClick={props.open}><p className='nav-links'><b>Log In</b></p></button></Nav.Link>
                        <Nav.Link style={{paddingTop: '0px', paddingBottom: '0px'}} eventKey={2}><button className='signup-btn' onClick={props.open2}><p className='nav-links2'><b>Sign Up</b></p></button></Nav.Link>

                    </div>
                }
                    
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}
export default Navigation