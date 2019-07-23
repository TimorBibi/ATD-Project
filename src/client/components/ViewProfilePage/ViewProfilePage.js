import React from 'react';
import './ViewProfilePage.scss';
import {connect} from 'react-redux';


class ViewProfilePage extends React.Component {

    componentDidMount() {
        // getUserProps
    }

    render() {
        return (
            <div>
            <label htmlFor="usernameLabel" className="form-text">Username:</label>
            <label htmlFor="usernameValue" className="form-text">{this.props.username}</label>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['app'].get('username'),
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
