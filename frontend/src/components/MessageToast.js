import {Toast, ToastContainer} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {closeMessageToast} from "../modules/user";

function MessageToast({closeMessageToast, messageToast}) {

    return <ToastContainer position='top-end' className="p-4 mt-5">
        <Toast bg={messageToast.variant} show={messageToast.showFlag} onClose={closeMessageToast} animation={false}
               autohide delay={4000}>
            {messageToast.message !== '' ?
                <Toast.Header className={messageToast.variant === 'primary' ?
                    'text-black bg-primary' : `text-white bg-${messageToast.variant}`}>
                    <strong className="me-auto">{messageToast.title}</strong>
                </Toast.Header>
                : <></>}
            <Toast.Body className={messageToast.variant === 'primary' ? 'text-black' : 'text-white'}>
                {messageToast.message !== '' ? messageToast.message : <strong>{messageToast.title}</strong>}
            </Toast.Body>
        </Toast>
    </ToastContainer>
}

function mapStateToProps(state) {
    return {
        messageToast: state.userReducer.messageToast
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({closeMessageToast}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageToast)