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
                        <Dropdown.Item name='logout' text='LogOut' onClick={this.props.logOutEventHandler} />
                    </Dropdown.Menu>
                );
        };

        return (
            <Menu className="ui top fixed menu">
                <Menu.Item name='home' active={active === 'home'} href="/"
                           onClick={(e, data) => this.props.setActiveEventHandler(e, data, this.props.activeItem)}>
                    Home
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown item text='User'>
                        {dropDownMenu()}
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isConnected: state['app'].get('isConnected'),
        // activeItem: state['topbar'].get('activeItem'), //TODO handle active Item after reRendering (cookies?)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveEventHandler: (e, data, current) => {
            dispatch(TopBarActions.setActiveAction(current, data.name));
        },
        logOutEventHandler: () => {
            dispatch(AppActions.disconnectUserAction());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
