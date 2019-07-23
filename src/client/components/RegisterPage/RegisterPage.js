import React from 'react';
import './RegisterPage.scss';
import {connect} from 'react-redux';
import RegisterPageActions from '../RegisterPage/actions';
import {Form} from 'semantic-ui-react';
import {InputText} from 'primereact/inputtext';
import {Message} from 'semantic-ui-react';
import { Input } from 'semantic-ui-react'
import {AutoComplete} from 'primereact/autocomplete';
import {Password} from 'primereact/password';
import AddReviewActions from "../AddReview/actions";


class RegisterPage extends React.Component {

    constructor(){
        super();
        this.downloadFile = this.downloadFile.bind(this);
    }

    componentDidUpdate() {
        if (this.props.isConnected)
            this.props.history.push('/'); //reload the root page
    }

    downloadFile(e) {
        const file = e.target.files[0];
        let fs = new FileReader();
        fs.onloadend = () => {
            let pictureData = fs.result;
            let value = {
                pictureType: file.type,
                pictureData: pictureData,
            };
            this.props.updateStateFieldEventHandler(e, {id:'picture' ,value: value});
        }
        fs.readAsDataURL(file);
    }

    render() {
        const usernameError = this.props.isValid ? null:
            (<Message negative>
                <p>The username is already been registered.</p>
            </Message>);

        const locationError = this.props.isValidLocation ? null:
            (<Message negative>
                <p>{this.props.locationMessage}</p>
            </Message>);

        return (
          <Form className="register-form" onSubmit={() => {
              this.props.submitEventHandler(
                  this.props.username,
                  this.props.password,
                  this.props.location,
                  this.props.picture,
                  this.props.isValid);}}>
              <Form.Field width='9'>
                <span className="p-float-label">
                    <InputText id="username" value={this.props.username} onChange={this.props.updateStateFieldEventHandler}
                               className="form-text form-input" onBlur={this.props.validateUsernameEventHandler} />
                    <label htmlFor="username" className="form-text">Username</label>
                    {usernameError}
                </span>
              </Form.Field>
              <Form.Field width='9'>
                  <span className="p-float-label">
                    <Password id='password' className="form-text form-input"
                              value={this.props.password} onChange={this.props.updateStateFieldEventHandler}/>
                    <label htmlFor="password" className="form-text">Password</label>
                  </span>
              </Form.Field>
              <Form.Field width='9'>
                  <Input type="file" id="picture"  accept="image/*" onChange={this.downloadFile}/>
              </Form.Field>
              <Form.Field width='9'>
                  <label htmlFor="location" className="form-text">Location:</label>
                  <AutoComplete id='location' value={this.props.location}
                                onBlur={(e) => this.props.validateLocationEventHandler(e, this.props.locations)}
                                onChange={this.props.updateStateFieldEventHandler}
                                suggestions={this.props.suggestions}
                                completeMethod={(e) => this.props.suggestLocationsEventHandler(this.props.locations, e)} />
                  {locationError}
              </Form.Field>
              <Form.Button content='Register' type="submit"/>
          </Form>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['registerPage'].get('username'),
        password: state['registerPage'].get('password'),
        isValid: state['registerPage'].get('isValidUsername'),
        location: state['registerPage'].get('location'),
        locations: state['app'].get('locations'),
        suggestions: state['registerPage'].get('suggestions'),
        picture: state['registerPage'].get('picture'),
        isConnected: state['app'].get('isConnected'),
        isValidLocation: state['registerPage'].get('isValidLocation'),
        locationMessage: state['registerPage'].get('locationMessage'),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        updateStateFieldEventHandler: (e, data) => {
            if (data) {
                dispatch(RegisterPageActions.updateStateFieldAction(data.id, data.value));
            }
            else
                dispatch(RegisterPageActions.updateStateFieldAction(e.target.id, e.target.value));
        },
        validateUsernameEventHandler: (e) => {
            dispatch(RegisterPageActions.validateUsernameAction(e.target.value));
        },
        suggestLocationsEventHandler: (locations, e) => {
            dispatch(RegisterPageActions.suggestLocationsAction(locations ,e.query));
        },
        submitEventHandler: (username, password, location, picture, isValid) => {
            dispatch(RegisterPageActions.submitUserAction(username, password, location, picture, isValid));
        },
        validateLocationEventHandler: (e, locations) => {
            dispatch(RegisterPageActions.validateLocationAction(e.target.value , locations));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
