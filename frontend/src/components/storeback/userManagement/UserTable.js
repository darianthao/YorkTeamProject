import {useState} from "react";
import {Button, Collapse, Container, Table} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {initiateDeleteUser} from "../../../modules/user";

function UserTable({users, initiateDeleteUser, handleEditUser, currentUser}) {
    return <Container>
        <Table size="sm" responsive>
            <thead className="table-secondary">
            <tr>
                <th width="50px" className="px-2">ID</th>
                <th className="px-2">First Name</th>
                <th className="px-2">Last Name</th>
                <th className="px-2">Email</th>
                <th className="px-2">Password</th>
                <th width="125px"/>
                <th width="50px"/>
                <th width="60px"/>
            </tr>
            </thead>
            <tbody>
            {
                users.length > 0 ?
                    users.map(user => <UserTableRow key={user.id} user={user} deleteUser={initiateDeleteUser}
                                                    editUser={handleEditUser} currentUser={currentUser}/>)
                    :
                    <tr>
                        <td colSpan={10}>There are no accounts to display.</td>
                    </tr>
            }
            </tbody>
        </Table>
    </Container>
}

function UserTableRow({deleteUser, editUser, user, currentUser}) {
    const [open, setOpen] = useState(false);

    return <>
        <tr>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td className="me-2">
                <Button variant="link" size="sm" onClick={() => setOpen(!open)}>
                    {open ? "Less Details" : "More Details"}
                </Button>
            </td>
            <td>
                <Button variant="warning" size="sm" onClick={() => editUser(user)}>Edit</Button>
            </td>
            <td>
                <Button variant="danger" size="sm" disabled={user.id === currentUser.id}
                        onClick={() => deleteUser(user.id)}>Delete</Button>
            </td>
        </tr>
        <Collapse in={open}>
            <tr className="hideTopBorder">
                <td colSpan={8}>
                    <p>
                        Address: {`${user.address1} ${user.address2}`}<br/>
                        {`${user.city}, ${user.state} ${user.zipCode}`}
                    </p>
                </td>
            </tr>
        </Collapse>
    </>
}

function mapStateToProps(state) {
    return {
        currentUser: state.userReducer.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateDeleteUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable)