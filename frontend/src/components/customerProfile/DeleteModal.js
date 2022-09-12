import {Button, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {exitDeleteProfile, initiateDeleteOwnAccount} from "../../modules/user";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function DeleteModal({show, currentUser, initiateDeleteOwnAccount, exitDeleteProfile}) {
    function handleClose() {
        exitDeleteProfile()
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ARE YOU SURE YOU WANT TO DELETE YOUR OWN ACCOUNT?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="danger" onClick={() => initiateDeleteOwnAccount(currentUser.id)}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>DELETE</Link>
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

function mapStateToProps(state) {
    return {
        show: state.userReducer.showDeleteProfile,
        currentUser: state.userReducer.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateDeleteOwnAccount, exitDeleteProfile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal)