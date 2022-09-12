import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, Navigate, useLocation} from "react-router-dom";
import {useState} from "react";
import {initiateRegister} from "../modules/user";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function RegistrationPage({initiateRegister, registerSuccess}) {
    let location = useLocation()
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [validated, setValidated] = useState(false);


    function addUser(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            e.preventDefault()
            e.stopPropagation()

            const newUser = {
                firstName: first,
                lastName: last,
                email: email,
                password: password,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zipCode: zip,
                accountType: 0
            }

            initiateRegister(newUser)
            //setValidated(false)
        }
        setValidated(true)
        e.preventDefault()
    }

    return registerSuccess ? <Navigate to="/user/login" replace state={location.state}/> : <>
        <Container>
                <div className='d-flex justify-content-center mt-5'>
                    <h1>Create New Shady Account</h1>
                </div>
                <div className='mt-3 mb-5 regForm'>
                    <Form noValidate validated={validated} className="mt-3" onSubmit={addUser}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter First Name"
                                              onChange={event => setFirst(event.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required type="text" placeholder="Last Name"
                                              onChange={event => setLast(event.target.value)}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" placeholder="Enter email"
                                              onChange={event => setEmail(event.target.value)}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" placeholder="Password"
                                              onChange={event => setPassword(event.target.value)}/>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St"
                                          onChange={event => setAddress1(event.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor"
                                          onChange={event => setAddress2(event.target.value)}/>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control placeholder='City' onChange={event => setCity(event.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Select defaultValue="Choose..." onChange={event => setState(event.target.value)}>
                                    <option>Choose...</option>
                                    <option value="Alabama">Alabama</option>
                                    <option>Alaska</option>
                                    <option>Arizona</option>
                                    <option>Arkansas</option>
                                    <option>California</option>
                                    <option>Colorado</option>
                                    <option>Connecticut</option>
                                    <option>Delaware</option>
                                    <option>Florida</option>
                                    <option>Georgia</option>
                                    <option>Hawaii</option>
                                    <option>Idaho</option>
                                    <option>Illinois</option>
                                    <option>Indiana</option>
                                    <option>Iowa</option>
                                    <option>Kansas</option>
                                    <option>Kentucky</option>
                                    <option>Louisiana</option>
                                    <option>Maine</option>
                                    <option>Maryland</option>
                                    <option>Massachusetts</option>
                                    <option>Michigan</option>
                                    <option>Minnesota</option>
                                    <option>Mississippi</option>
                                    <option>Missouri</option>
                                    <option>Montana</option>
                                    <option>Nebraska</option>
                                    <option>Nevada</option>
                                    <option>New Hampshire</option>
                                    <option>New Jersey</option>
                                    <option>New Mexico</option>
                                    <option>New York</option>
                                    <option>North Carolina</option>
                                    <option>North Dakota</option>
                                    <option>Ohio</option>
                                    <option>Oklahoma</option>
                                    <option>Oregon</option>
                                    <option>Pennsylvania</option>
                                    <option>Rhode Island</option>
                                    <option>South Carolina</option>
                                    <option>South Dakota</option>
                                    <option>Tennessee</option>
                                    <option>Texas</option>
                                    <option>Utah</option>
                                    <option>Vermont</option>
                                    <option>Virginia</option>
                                    <option>Washington</option>
                                    <option>West Virginia</option>
                                    <option>Wisconsin</option>
                                    <option>Wyoming</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control placeholder='Zip' onChange={event => setZip(event.target.value)}/>
                            </Form.Group>
                        </Row>
                        <Button className='regBtn' variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <p className='mt-3'>Already have an account?<Link className='ps-1' to="/user/login">Login here</Link></p>
                </div>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        registerSuccess: state.userReducer.registerSuccess
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateRegister}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)