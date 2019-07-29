import React from 'react';
import './TopBar.scss';
import {connect} from 'react-redux';
import TopBarActions from '../TopBar/actions';
import { Menu, Dropdown } from 'semantic-ui-react';
import AppActions from '../App/actions'


class TopBar extends React.Component {


    render() {
        const active = this.props.activeItem;

        const dropDownMenu = () => {
            if(!this.props.isConnected)
                return (
                    <Dropdown.Menu>
                        <Dropdown.Item name='login' text='LogIn' active={active === 'login'} href="/login" />
                        <Dropdown.Item name='register' text='Register' active={active === 'register'} href="/register" />
                    </Dropdown.Menu>
                );
            else
                return (
                    <Dropdown.Menu>
                        <Dropdown.Item name='viewProfile' text='View Profile' active={active === 'viewProfile'} href="/viewProfile" />
                        <Dropdown.Divider/>
                        <Dropdown.Item name='logout' text='LogOut' href="/" onClick={this.props.logOutEventHandler} />
                    </Dropdown.Menu>
                );
        };

        return (
            <div className="ui tabular menu">
            <Menu>
                <Menu.Item  className="item" name='home' active={active === 'home'} href="/"
                           onClick={(e, data) => this.props.setActiveEventHandler(data)}>
                    Home
                </Menu.Item>
                <Menu.Item  className="item" name='users' active={active === 'users'} href="/users"
                           onClick={(e, data) => this.props.setActiveEventHandler(data)}>
                    Users
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item className="item" name='user'>
                    <Dropdown text='User'>
                        {dropDownMenu()}
                    </Dropdown>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isConnected: state['app'].get('isConnected'),
        activeItem: state['app'].get('activeItem'), //TODO handle active Item after reRendering (cookies?)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveEventHandler: (data) => {
            dispatch(AppActions.setActiveAction(data.name));
        },
        logOutEventHandler: () => {
            dispatch(AppActions.disconnectUserAction());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
