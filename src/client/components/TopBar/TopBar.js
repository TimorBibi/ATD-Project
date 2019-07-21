import React from 'react';
import './TopBar.scss';
import {connect} from 'react-redux';
import TopBarActions from '../TopBar/actions';
import { Menu } from 'semantic-ui-react';
import AppActions from '../App/actions'


class TopBar extends React.Component {

    render() {
        const isConnected = this.props.isConnected;
        const active = this.props.activeItem;

        const rightMenu = () => {
            if(!isConnected)
                return (
                    <Menu.Menu position='right'>
                        <Menu.Item name='login' active={active === 'login'} href="/login"
                                   onClick={(e, data) => this.props.setActiveEventHandler(e, data, this.props.activeItem)}>
                            LogIn
                        </Menu.Item>
                        <Menu.Item name='register' active={active === 'register'} href="/register"
                                   onClick={(e, data) => this.props.setActiveEventHandler(e, data, this.props.activeItem)}>
                            Register
                        </Menu.Item>
                    </Menu.Menu>
                );
            else
                return (
                    <Menu.Menu position='right'>
                        <Menu.Item name='logout' onClick={this.props.logOutEventHandler}>
                            LogOut
                        </Menu.Item>
                    </Menu.Menu>
                );
        }
        return (
            <Menu className="ui top fixed menu">
                <Menu.Item name='home' active={active === 'home'} href="/"
                           onClick={(e, data) => this.props.setActiveEventHandler(e, data, this.props.activeItem)}>
                    Home
                </Menu.Item>
                {rightMenu()}
            </Menu>
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
        setActiveEventHandler: (e, data, current) => {
            dispatch(TopBarActions.setActiveAction(current, data.name));
        },
        logOutEventHandler: () => {
            dispatch(AppActions.disconnectUserAction());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
