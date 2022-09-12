import React from "react";
import {Col, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

function Footer() {
    return <Navbar id="main-footer" bg="black" variant="dark">
        <Container fluid className="flex-column">
            <Col className="d-flex p-3">
                <LinkContainer to="/">
                    <Nav.Link className="mx-4 px-3">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                    <Nav.Link className="mx-4 px-3">About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                    <Nav.Link className="mx-4 px-3">Contact Us</Nav.Link>
                </LinkContainer>
            </Col>
            <Col className="p-2">
                <Navbar.Text>
                    <span className="mx-3">&copy;{new Date().getFullYear()} SHADY SHACK</span>|
                    <span className="mx-3">All rights reserved</span>|
                    <span className="mx-3">Terms Of Service</span>|
                    <span className="mx-3">Privacy</span>
                </Navbar.Text>
            </Col>
        </Container>
    </Navbar>
}

export default Footer;