import {Button, Col, Container, Nav, Row, Tab, Tabs} from "react-bootstrap";
import {connect} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {bindActionCreators} from "redux";
import {startDeleteProfile, startEditProfile} from "../modules/user";
import {BsPencil, BsTrash} from "react-icons/bs";
import EditModal from "./customerProfile/EditModal";
import DeleteModal from "./customerProfile/DeleteModal";

function UserProfilePage({currentUser, startEditProfile, startDeleteProfile}) {
    let hidePassword = "********"

    return <>
        <Container fluid>
            <EditModal/>
            <DeleteModal/>
            <Row className="m-5">
                <Col xs="auto">
                    <Nav defaultActiveKey="/user/profile" className="flex-column" variant="pills">
                        <LinkContainer to="/user/profile">
                            <Nav.Link>Account Information</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/user/orders">
                            <Nav.Link>Order History</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Col>

                <Col className="tabs">
                    <Tabs id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="accountDetails" title="Account Details">
                            <Row className="mb-5">
                                <h2>User Profile</h2>
                                <p><span className="text-primary pe-1">First Name:</span> {currentUser.firstName}</p>
                                <p><span className="text-primary pe-1">Last Name:</span> {currentUser.lastName}</p>
                                <p><span className="text-primary pe-1">Email:</span> {currentUser.email}</p>
                                <p><span className="text-primary pe-1">Password:</span> {hidePassword}</p>
                                <p className="mb-1 text-primary">Address:</p>
                                {(currentUser.address1 || currentUser.city || currentUser.state || currentUser.zipCode) === "" ?
                                    <p className="ms-4 mb-5">Incomplete Address: Please verify</p> :
                                    <p className="ms-4">
                                        {currentUser.address1}<br/>
                                        {currentUser.address2 === "" ? <></> : <><p>{currentUser.address2}</p><br/></>}
                                        {currentUser.city}, {currentUser.state} {currentUser.zipCode}
                                    </p>
                                }
                            </Row>
                            <Row>
                                <Col xs="auto">
                                    <Button onClick={() => startEditProfile(currentUser)}
                                            disabled={currentUser.accountType === 2}><BsPencil/> Edit Profile</Button>
                                </Col>
                                <Col xs="auto">
                                    <Button variant="danger" onClick={() => startDeleteProfile()}
                                            disabled={currentUser.accountType === 2}><BsTrash/> Delete Account</Button>
                                </Col>
                            </Row>
                            {currentUser.accountType === 2 ?
                                <Row className="mt-3 ms-1">
                                    <p>
                                        *Administrators must use User Management interface to edit account details
                                    </p>
                                </Row>
                                : <></>
                            }
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        currentUser: state.userReducer.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({startEditProfile, startDeleteProfile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage)