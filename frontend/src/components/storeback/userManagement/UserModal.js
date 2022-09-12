import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {closeModal, initiateAddUser, initiateEditUser, streamModalData} from "../../../modules/user";
import FormStateSelector from "../../../helpers/FormStateSelector";

function UserModal({
                       showModalFlag,
                       modalData,
                       closeModal,
                       initiateAddUser,
                       initiateEditUser,
                       streamModalData,
                       currentUser
                   }) {
    function handleSubmit(e) {
        e.preventDefault()
        modalData.id >= 0 ? initiateEditUser(modalData) : initiateAddUser(modalData)
        closeModal()
    }

    function handleStatePicker(e) {
        streamModalData({...modalData, state: e.target.value})
    }

    return <Modal size="lg" show={showModalFlag} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>{modalData.id >= 0 ? 'Edit User Details' : 'Create New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="col-4">
                        <Form.Group controlId="userTypeSelect" className='mb-3'>
                            <Form.Label>Select Account Type:</Form.Label>
                            <Form.Select value={modalData.accountType} disabled={modalData.id === currentUser.id}
                                         onChange={e => streamModalData({...modalData, accountType: e.target.value})}>
                                <option value={0}>Customer</option>
                                <option value={1}>Shopkeeper</option>
                                <option value={2}>Administrator</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="userFirstName" className='mb-3'>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" value={modalData.firstName}
                                          onChange={e => streamModalData({
                                              ...modalData,
                                              firstName: e.target.value.trimStart()
                                          })}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="userLastName" className='mb-3'>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" value={modalData.lastName}
                                          onChange={e => streamModalData({
                                              ...modalData,
                                              lastName: e.target.value.trimStart()
                                          })}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-6">
                        <Form.Group controlId="userEmail" className='mb-3'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={modalData.email}
                                          disabled={modalData.id === currentUser.id}
                                          onChange={e => streamModalData({
                                              ...modalData,
                                              email: e.target.value.trimStart()
                                          })}/>
                            <Form.Text className="text-muted">* Required Field</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col className="col-6">
                        <Form.Group controlId="userPassword" className='mb-3'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={modalData.password}
                                          disabled={modalData.id === currentUser.id}
                                          onChange={e => streamModalData({
                                              ...modalData,
                                              password: e.target.value.trimStart()
                                          })}/>
                            <Form.Text className="text-muted">* Required Field</Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="userAddress1" className='mb-3'>
                            <Form.Label>Address:</Form.Label>
                            <Form.Control type="text" placeholder="Address" value={modalData.address1}
                                          onChange={e => streamModalData({
                                              ...modalData,
                                              address1: e.target.value.trimStart()
                                          })}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="userAddress2" className='mb-3'>
                            <Form.Label>Address 2:</Form.Label>
                            <Form.Control type="text" placeholder="Address 2" value={modalData.address2}
                                          onChange={e => streamModalData({
                                              ...modalData,
                                              address2: e.target.value.trimStart()
                                          })}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group controlId="userCity" className='mb-3'>
                            <Form.Label>City:</Form.Label>
                            <Form.Control type="text" placeholder="City" value={modalData.city}
                                          onChange={e => streamModalData({
                                              ...modalData,
                                              city: e.target.value.trimStart()
                                          })}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="userState" className='mb-3'>
                            <Form.Label>State:</Form.Label>
                            <FormStateSelector value={modalData.state} changeFunction={handleStatePicker}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="userZipCode" className='mb-3'>
                            <Form.Label>Zip Code:</Form.Label>
                            <Form.Control type="text" placeholder="Zip Code" value={modalData.zipCode}
                                          onChange={e => streamModalData({
                                              ...modalData,
                                              zipCode: e.target.value.trimStart()
                                          })}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button
                    className='me-2'
                    variant="warning" onClick={closeModal}>
                    Discard
                </Button>
                <Button variant="primary" type="submit" disabled={modalData.email === '' || modalData.password === ''}>
                    {modalData.id >= 0 ? 'Save Changes' : 'Create'}
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
}

function mapStateToProps(state) {
    return {
        showModalFlag: state.userReducer.showModalFlag,
        modalData: state.userReducer.modalData,
        currentUser: state.userReducer.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddUser, initiateEditUser, closeModal, streamModalData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserModal)