import {Navigate, useLocation} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function RequireAuth({children, accountType, minAuthLevel = 0}) {
    let location = useLocation();

    if (accountType === undefined) {
        return <Navigate to="/user/login" replace state={{from: location}}/>;
    }

    if (accountType >= minAuthLevel) {
        return children
    } else {
        return <Navigate to="/" replace/>
    }

}

function mapStateToProps(state) {
    return {
        accountType: state.userReducer.currentUser.accountType
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth)