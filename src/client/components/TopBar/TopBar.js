import React from 'react';
import './TopBar.scss';
import {connect} from 'react-redux';
import TopBarActions from '../TopBar/actions';
import { Menu } from 'semantic-ui-react';


class TopBar extends React.Component {

    render() {
        const isConnected = this.props.isConnected;
        const active = this.props.activeItem;

        const rightMenu = () => {
            if(!isConnected)
                return (
                    <Menu.Menu position='right'>
                        <Menu.Item name='login' active={active === 'login'} onClick={this.props.setActiveEventHandler}>
                            LogIn
                        </Menu.Item>
                        <Menu.Item name='register' active={active === 'register'} onClick={this.props.setActiveEventHandler}>
                            Register
                        </Menu.Item>
                    </Menu.Menu>
                );
            else
                return (
                    <Menu.Menu position='right'>
                        <Menu.Item name='logout' active={active === 'logout'} onClick={this.props.setActiveEventHandler}>
                            LogOut
                        </Menu.Item>
                    </Menu.Menu>
                );
        }
        return (
            <Menu>
                <Menu.Item name='home' active={active === 'home'} onClick={this.props.setActiveEventHandler}>
                    Home
                </Menu.Item>
                {rightMenu()}
            </Menu>
        )
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
        setActiveEventHandler: (e) => {
            dispatch(TopBarActions.setActiveAction(e.target.name));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
