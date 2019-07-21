import React from 'react';
import './ViewProfilePage.scss';
import {connect} from 'react-redux';


class ViewProfilePage extends React.Component {

    componentDidMount() {
        // getUserProps
    }

    render() {
        return (
            <div></div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['loginPage'].get('username'),
        password: state['loginPage'].get('password'),
        usernameError: state['loginPage'].get('usernameError'),
        passwordError: state['loginPage'].get('passwordError'),
        isConnected: state['app'].get('isConnected'),
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateFieldEventHandler: (e) => {
            dispatch(LogInPageActions.updateStateFieldAction(e.target.id, e.target.value));
        },
        loginEventHandler: (username, password) => {
            dispatch(LogInPageActions.validateUserAction(username, password));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfilePage);
