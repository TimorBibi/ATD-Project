import React from 'react';
import './LogInPage.scss';
import {connect} from 'react-redux';
import LogInPageActions from '../LogInPage/actions';
import {Form} from 'semantic-ui-react';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
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
          <Form className="logIn-form" onSubmit={() => {
              this.props.loginEventHandler(
                  this.props.username,
                  this.props.password);}}>
              <Growl ref={(el) => this.growl = el} position="bottomright"/>
              <Form.Field width='9'>
                <span className="p-float-label">
                    <InputText id="username" value={this.props.username} onChange={this.props.updateStateFieldEventHandler}
                               className="form-text form-input" />
                    <label htmlFor="username" className="form-text">Username</label>
                </span>
              </Form.Field>
              <Form.Field width='9'>
                  <span className="p-float-label">
                    <Password id='password' className="form-text form-input"
                              value={this.props.password} onChange={this.props.updateStateFieldEventHandler}/>
                    <label htmlFor="password" className="form-text">Password</label>
                  </span>
              </Form.Field>
              <Form.Button content='LogIn' type="submit"/>
          </Form>
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
