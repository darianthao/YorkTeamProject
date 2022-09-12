import {Button, Container, Form} from "react-bootstrap";
import {Link, Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {initiateLogin, resetRegisterSuccess} from "../modules/user";
import {useEffect, useState} from "react";
import {bindActionCreators} from "redux";

function LoginPage({initiateLogin, resetRegisterSuccess, accountType}) {
    let location = useLocation();
    let redirectPath = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => resetRegisterSuccess(), [])

    function handleSubmit(event) {
        event.preventDefault()
        initiateLogin({email, password})
    }

    return (accountType === undefined) ? <Container>
            <div className='d-flex justify-content-center mt-5'>
                <h1>Shady Shack Login</h1>
            </div>
            <div className='loginForm'>
                <Form className='mt-3' onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="Enter Username"
                                      onChange={event => setEmail(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      onChange={event => setPassword(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center'>
                        <Button className='mt-3 loginBtn' variant="primary" type="submit">
                            Login
                        </Button>
                    </Form.Group>
                </Form>
            </div>
            <div className='d-flex justify-content-center'>
                <p className='mt-2'>Don't have an account? <span><Link to="/user/register" state={location.state}>Sign Up</Link></span></p>
            </div>
        </Container>
        : <Navigate to={redirectPath} replace/>
}

function mapStateToProps(state) {
    return {
        accountType: state.userReducer.currentUser.accountType
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateLogin, resetRegisterSuccess}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)