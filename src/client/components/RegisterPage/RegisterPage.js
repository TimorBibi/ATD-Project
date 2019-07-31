import React from 'react';
import './RegisterPage.scss';
import {connect} from 'react-redux';
import RegisterPageActions from '../RegisterPage/actions';
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import {InputText} from 'primereact/inputtext';
import {AutoComplete} from 'primereact/autocomplete';
import {Password} from 'primereact/password';
import {Growl} from "primereact/components/growl/Growl";


class RegisterPage extends React.Component {

    constructor(){
        super();
        this.downloadFile = this.downloadFile.bind(this);
    }

    componentDidUpdate() {
        if(this.props.submitMessage.message) {
            if (this.props.submitMessage.succeed)
                this.growl.show({severity: 'success', summary: this.props.submitMessage.message});
            else
                this.growl.show({severity: 'error', summary: this.props.submitMessage.message});
            this.props.initRegisterMessageEventHandler();
        }

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
        };
        fs.readAsDataURL(file);
    }
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='violet' textAlign='center'>
                        {/*<Image src='/logo.png' /> */}
                        Register
                    </Header>
                    <Form className="register-form"  size='large' onSubmit={() => {
                        this.props.submitEventHandler(
                                      this.props.username,
                                      this.props.password,
                                      this.props.location,
                                      this.props.picture,
                                      this.props.locations,
                                      this.props.isValid);}}>
                        <Segment stacked>
                            <Growl ref={(el) => this.growl = el} position="bottomright"/>

                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                                        id="username" value={this.props.username} onChange={this.props.updateStateFieldEventHandler}
                                        onBlur={this.props.validateUsernameEventHandler} />

                            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password'
                                        type='password' id='password'
                                onChange={this.props.updateStateFieldEventHandler}/>

                            <Form.Input fluid type='file' id="picture"  accept="image/*" onChange={this.downloadFile}/>

                            <Form.Field>
                               <AutoComplete id='location' value={this.props.location} placeholder='Location'
                                onChange={this.props.updateStateFieldEventHandler}
                                suggestions={this.props.suggestions}
                                completeMethod={(e) => this.props.suggestLocationsEventHandler(this.props.locations, e)} />
                            </Form.Field>

                            <Button color='violet' fluid size='large' type="submit">
                                Register
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['registerPage'].get('username'),
        password: state['registerPage'].get('password'),
        isValid: state['registerPage'].get('isValid'),
        location: state['registerPage'].get('location'),
        locations: state['app'].get('locations'),
        suggestions: state['registerPage'].get('suggestions'),
        picture: state['registerPage'].get('picture'),
        isConnected: state['app'].get('isConnected'),
        locationMessage: state['registerPage'].get('locationMessage'),
        submitMessage: state['registerPage'].get('submitMessage'),
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
        submitEventHandler: (username, password, location, picture, locations, isValid) => {
            dispatch(RegisterPageActions.submitUserAction(username, password, location, picture, locations, isValid));
        },
        initRegisterMessageEventHandler: () => {
            dispatch(RegisterPageActions.initRegisterMessageAction());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
