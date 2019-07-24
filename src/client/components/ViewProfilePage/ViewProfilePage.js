import React from 'react';
import './ViewProfilePage.scss';
import {connect} from 'react-redux';
import LogInPageActions from "../LogInPage/actions";
const {Map, List} = require('immutable');

class ViewProfilePage extends React.Component {

    componentDidMount() {
        // getUserProps
    }
    // constructor(props)
    // {
    //     super(props);
    //     console.log("#####", this.props.userId);
    // }

    render() {
        // debugger;
        const user = Map(this.props.users.find((usr)=> usr['username'] === this.props.username));
        const imgsrc = Map(user.get('picture')).get('data');


        // console.log("???user ", Map(user).get('location'));
        console.log("???usersss ", Map(user.get('picture')).get('contentType'));
        return (
            <div>
                <div align="right" className="imgPreview">
                <img src={imgsrc} width="200" height="100"/>
                </div>
                <div>
                    <h5>
                        <label htmlFor="usernameLabel" className="form-text">Username:    </label>
                        <label htmlFor="usernameValue" className="form-text">{this.props.username}</label>
                    </h5>
                </div>
                <div>
                    <h5><label htmlFor="locationLabel" className="form-text">Location:    </label>
                    <label htmlFor="locationValue" className="form-text">{Map(user.get('location')).get('name')}</label></h5>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['app'].get('username'),
        users: state['app'].get('users'),
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
