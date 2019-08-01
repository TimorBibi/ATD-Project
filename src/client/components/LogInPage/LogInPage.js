import React from 'react';
import './LogInPage.scss';
import {connect} from 'react-redux';
import LogInPageActions from '../LogInPage/actions';
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import {Growl} from "primereact/components/growl/Growl";


class LogInPage extends React.Component {

    componentDidUpdate() {
        if (this.props.isConnected)
            this.props.history.push('/'); //reload the root page

        if (this.props.errorMessage) {
            this.growl.show({severity: 'error', summary: this.props.errorMessage});
            this.props.initErrorEventHandler();
        }
    }

    render() {

        return (
            <Grid textAlign='center' className='logIn-container' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='violet' textAlign='center'>
                        {/*<Image src='/logo.png' /> */}
                        Log-in to your account
                    </Header>
                    <Form className="logIn-form"  size='large' onSubmit={() => {
                        this.props.loginEventHandler(
                        this.props.username,
                        this.props.password);}}>
                    <Growl ref={(el) => this.growl = el} position="bottomright"/>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                                        id="username" value={this.props.username} onChange={this.props.updateStateFieldEventHandler}/>

                            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password'
                                type='password' id='password' value={this.props.password}
                                onChange={this.props.updateStateFieldEventHandler}/>

                            <Button color='violet' fluid size='large' type="submit">
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <a  href="/register">Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
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
        errorMessage: state['loginPage'].get('errorMessage'),
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
        initErrorEventHandler: () => {
            dispatch(LogInPageActions.initErrorMessageAction());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
