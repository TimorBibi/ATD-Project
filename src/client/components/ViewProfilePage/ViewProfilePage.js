import React from 'react';
import './ViewProfilePage.scss';
import {connect} from 'react-redux';
import LogInPageActions from "../LogInPage/actions";
import UsersActions from "../Users/actions";
const {Map, List} = require('immutable');

class ViewProfilePage extends React.Component {

    componentDidMount() {
        // getUserProp
        if(this.props.movetoViewProfilePage)
        {
            this.initViewProfileEventHandler;
        }
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

        return (
            <div>
                    <h2 id="usernameValue">{this.props.username}</h2>
                <div className="imgPreview">
                    <img src={imgsrc} width="200" height="100"/>
                </div>
                    <h5><label htmlFor="locationLabel" className="form-text">Location:    </label>
                    <label htmlFor="locationValue" className="form-text">{Map(user.get('location')).get('city')}</label></h5>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['app'].get('username'),
        users: state['app'].get('users'),
        isConnected: state['app'].get('isConnected'),
        movetoViewProfilePage: state['users'].get('movetoViewProfilePage'),
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        initViewProfileEventHandler: () =>
        {
            dispatch(UsersActions.movedFromUsersPage());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfilePage);
