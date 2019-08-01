import React from 'react';
import './TopBar.scss';
import {connect} from 'react-redux';
import TopBarActions from '../TopBar/actions';
import { Menu, Dropdown } from 'semantic-ui-react';
import AppActions from '../App/actions'
import { NavLink } from 'react-router-dom'


class TopBar extends React.Component {


    render() {
        const active = this.props.activeItem;

        const dropDownMenu = () => {
            if(!this.props.isConnected)
                return (
                    <Dropdown.Menu>
                        <NavLink to="/login" name='login' onClick={() => this.props.setActiveEventHandler("login")}>
                            <Dropdown.Item name='login' text='LogIn' active={active === 'login'}/>
                        </NavLink>
                        <NavLink to="/register" name='register' onClick={() => this.props.setActiveEventHandler("register")}>
                            <Dropdown.Item name='register' text='Register' active={active === 'register'} />
                        </NavLink>
                    </Dropdown.Menu>
                );
            else
                return (
                    <Dropdown.Menu>
                        <NavLink to="/viewProfile" name='viewProfile' onClick={() => this.props.setActiveEventHandler("viewProfile")}>
                            <Dropdown.Item name='viewProfile' text='View Profile' active={active === 'viewProfile'}/>
                        </NavLink>
                        <Dropdown.Divider/>
                        <NavLink to="/" name='LogOut' onClick={() => this.props.setActiveEventHandler("/")}>
                            <Dropdown.Item name='logout' text='LogOut' onClick={this.props.logOutEventHandler} />
                        </NavLink>
                    </Dropdown.Menu>
                );
        };

        return (
            <div className="ui tabular menu">
            <Menu>
                <NavLink to="/" name='restaurants'
                          onClick={() => this.props.setActiveEventHandler("restaurants")}>
                    <Menu.Item  className="item" active={active === 'restaurants'}>
                        Restaurants
                    </Menu.Item>
                </NavLink>
                <NavLink to="/users" name='users'
                         onClick={() => this.props.setActiveEventHandler("users")}>
                    <Menu.Item  className="item" active={active === 'users'}>
                        Users
                    </Menu.Item>
                </NavLink>
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
        activeItem: state['topbar'].get('activeItem'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveEventHandler: (name) => {
            dispatch(TopBarActions.setActiveAction(name));
        },
        logOutEventHandler: () => {
            dispatch(AppActions.disconnectUserAction());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
