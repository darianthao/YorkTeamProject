import {Button, Form, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {finishEditProfile, initiateEditCustomer, setCustomerData} from "../../modules/user";
import {connect} from "react-redux";
import {useState} from "react";

function EditModal({customerModalData, showEditProfile, initiateEditCustomer, finishEditProfile, currentUser, setCustomerData}) {
    const [validated, setValidated] = useState(false);

    function handleSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            e.preventDefault()
            e.stopPropagation()
            initiateEditCustomer(customerModalData)
            finishEditProfile()
            //setValidated(false)
        }
        setValidated(true)
        e.preventDefault()
    }

    function handleClose() {
        setValidated(false)
        finishEditProfile()
        // This is to reset all fields back to the original in the case that the
        // user altered 1 or more fields but then closes out of the edit modal
        setCustomerData({
            ...customerModalData,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            password: currentUser.password,
            address1: currentUser.address1,
            address2: currentUser.address2,
            city: currentUser.city,
            state: currentUser.state,
            zipCode: currentUser.zipCode
        })
    }

    return <>
        <Modal show={showEditProfile} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="userFirstName" className='mt-3'>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control required type="text" value={customerModalData.firstName} placeholder="First Name"
                                  onChange={e => setCustomerData({...customerModalData,
                                      firstName: e.target.value.trimStart()})}/>
                    <Form.Control.Feedback type="invalid">
                        Please type in your first name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="userLastName" className='mt-3'>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control required type="text" value={customerModalData.lastName} placeholder="Last Name"
                                  onChange={e => setCustomerData({...customerModalData,
                                      lastName: e.target.value.trimStart()})}/>
                    <Form.Control.Feedback type="invalid">
                        Please type in your last name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="userEmail" className='mt-3'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control required type="email" value={customerModalData.email} placeholder="Email"
                                  onChange={e => setCustomerData({
                                      ...customerModalData,
                                      email: e.target.value.trimStart()
                                  })}/>
                    <Form.Control.Feedback type="invalid">
                        Please type in an email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="userPassword" className='mt-3'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control required type="password" value={customerModalData.password} placeholder="Password"
                                  onChange={e => setCustomerData({...customerModalData,
                                      password: e.target.value.trimStart()})}/>
                    <Form.Control.Feedback type="invalid">
                        Please type in a password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="userAddress1" className='mt-3'>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control type="text" value={customerModalData.address1} placeholder="1234 Main St"
                                  onChange={e => setCustomerData({...customerModalData,
                                      address1: e.target.value.trimStart()})}/>
                </Form.Group>
                <Form.Group controlId="userAddress2" className='mt-3'>
                    <Form.Label>Address 2:</Form.Label>
                    <Form.Control type="text" value={customerModalData.address2} placeholder="Apt 1, etc."
                                  onChange={e => setCustomerData({...customerModalData,
                                      address2: e.target.value.trimStart()})}/>
                </Form.Group>
                <Form.Group controlId="userCity" className='mt-3'>
                    <Form.Label>City:</Form.Label>
                    <Form.Control type="text" value={customerModalData.city} placeholder="City"
                                  onChange={e => setCustomerData({...customerModalData,
                                      city: e.target.value.trimStart()})}/>
                </Form.Group>
                <Form.Group controlId="userState" className='mt-3'>
                    <Form.Label>State:</Form.Label>
                    <Form.Control type="text" value={customerModalData.state} placeholder="State"
                                  onChange={e => setCustomerData({...customerModalData,
                                      state: e.target.value.trimStart()})}/>
                </Form.Group>
                <Form.Group controlId="userZipCode" className='my-3'>
                    <Form.Label>Zip Code:</Form.Label>
                    <Form.Control type="text" value={customerModalData.zipCode} placeholder="Zip Code"
                                  onChange={e => setCustomerData({...customerModalData,
                                      zipCode: e.target.value.trimStart()})}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
    </>
}

function mapStateToProps(state) {
    return {
        showEditProfile: state.userReducer.showEditProfile,
        customerModalData: state.userReducer.customerModalData,
        currentUser: state.userReducer.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateEditCustomer, finishEditProfile, setCustomerData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)