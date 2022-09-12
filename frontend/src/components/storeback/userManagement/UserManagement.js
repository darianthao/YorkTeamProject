import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {initiateGetUsers, showModal} from "../../../modules/user";
import UserModal from "./UserModal";
import UserTable from "./UserTable";

function UserManagement({initiateGetUsers, users, showModal}) {
    useEffect(() => initiateGetUsers(), [])

    function handleAddUser() {
        showModal()
    }

    function handleEditUser(userData) {
        showModal(userData)
    }

    return <Container>
        <UserModal/>
        <Row>
            <Col><h2 className="m-3">User Accounts</h2></Col>
            <Col className='d-flex justify-content-end'><Button className="m-3" onClick={handleAddUser}>Add New User</Button></Col>
        </Row>
        <Row>
            <Col><h5 className="m-3">Administrators</h5></Col>
            <UserTable key="administrators" users={users.filter(user => user.accountType === 2)} handleEditUser={handleEditUser}/>
        </Row>
        <Row>
            <Col><h5 className="m-3">Shopkeepers</h5></Col>
            <UserTable key="shopkeepers" users={users.filter(user => user.accountType === 1)} handleEditUser={handleEditUser}/>
        </Row>
        <Row>
            <Col><h5 className="m-3">Customers</h5></Col>
            <UserTable key="customers" users={users.filter(user => user.accountType === 0)} handleEditUser={handleEditUser}/>
        </Row>
    </Container>
}

function mapStateToProps(state) {
    return {
        users: state.userReducer.users
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateGetUsers, showModal}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)