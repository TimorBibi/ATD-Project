import React from 'react';
import './ViewProfilePage.scss';
import {connect} from 'react-redux';
import UsersActions from "../Users/actions";
import {Button, Form, Grid, Header, Image, Input, Segment} from "semantic-ui-react";
import {DataView} from "primereact/components/dataview/DataView";
import ViewProfilePageActions from "./actions";
import {Growl} from "primereact/components/growl/Growl";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
const {Map, List} = require('immutable');
import Review from "../Review/Review";


class ViewProfilePage extends React.Component {

    componentDidMount() {
        if(this.props.movetoViewProfilePage)
        {
            this.props.initViewProfileEventHandler();
        }
    }

    componentDidUpdate() {
        if(this.props.submitMessage.message) {
            if (this.props.submitMessage.succeed)
                this.growl.show({severity: 'success', summary: this.props.submitMessage.message});
            else
                this.growl.show({severity: 'error', summary: this.props.submitMessage.message});
            this.props.initViewProfileMessageEventHandler();
        }
    }

    constructor(){
        super();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    downloadFile(e) {
        const file = e.target.files[0];
        let fs = new FileReader();
        fs.onloadend = () => {
            let pictureData = fs.result;
            let value = {
                contentType: file.type,
                data: pictureData,
            };
            this.props.updateStateFieldEventHandler(e, {id:'profilePicture' ,value: value});
        };
        fs.readAsDataURL(file);
    }

    itemTemplate(review, layout) {

        if (layout === 'list') {
            return(<Review review={review} key={review.username+'_'+review.timeStamp+"comp"}/>)
        }
    }

    editProfile()
    {
        const imgsrc = Map(this.props.profilePicture).get('data');
        return (
            <Form className='edit_profile_form' onSubmit={() =>{
                        this.props.submitEventHandler(
                            this.props.profileUsername,
                            this.props.profilePassword,
                            this.props.profileLocation,
                            this.props.profilePicture,
                            this.props.prevPicture,
                            this.props.locations,
                            this.props.isValid,
                             this.props.username,
                        );}}>

                <Growl ref={(el) => this.growl = el} position="bottomright"/>
                <Header as='h2' color='violet' textAlign='center'>
                    {/*<Image src='/logo.png' /> */}
                    Edit Profile
                </Header>
                <Segment stacked className= 'edit_profile_form'>
                    <Grid textAlign='center' verticalAlign='middle'>
                        <Grid.Row columns={2}>
                            <Grid.Column >
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                                            id='profileUsername' value={this.props.profileUsername}
                                            onChange={this.props.updateStateFieldEventHandler}
                                            onBlur={(e)=>this.props.validateEditUsernameEventHandler(e, this.props.username)} />
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password'
                                            type='password' id='profilePassword'
                                            onChange={this.props.updateStateFieldEventHandler}/>
                                <Form.Field>
                                    <AutoComplete className="location_field" id='profileLocation'
                                                  value={this.props.profileLocation}
                                                  onChange={this.props.updateStateFieldEventHandler}
                                                  suggestions={this.props.suggestions}
                                                  completeMethod={(e) => this.props.suggestLocationsEventHandler(this.props.locations, e)} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Image src={imgsrc} size='small' verticalAlign='middle' className= 'profile_picture'/>

                                <Form.Input fluid type='file' id="profilePicture"  accept="image/*"
                                            onChange={this.downloadFile}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column >
                                <Button className='left_profile_btn' id="submit" color='violet'  size='small' fluid type="submit">
                                    Save
                                </Button>
                            </Grid.Column>
                            <Grid.Column >
                                <Button className='right_profile_btn' color='violet'  size='small' fluid type="button"
                                        onClick={() => this.props.showEditProfileEventHandler(this.props.editProfile)}>
                                    Cancel
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Form>
       );
    }

    viewProfile(user, imgsrc)
    {
        return (
            <div className='viewProfile_form'>
                <Segment stacked className= 'viewProfile_form'>
                    <Grid  verticalAlign='middle'>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Grid columns={2}>
                                    <Grid.Column>
                                        <Image src={imgsrc} size='small' spaced='left'/>
                                    </Grid.Column>
                                    <Grid.Column verticalAlign='middle'>
                                        <Header className= 'show_user' id="userName" as='h1' color='grey'>
                                            {user.get('username')}
                                        </Header>
                                        <Header className= 'show_user' id="location" as='h5' color='grey'>
                                            {Map(user.get('location')).get('city')}
                                        </Header>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column>
                                <Button id={"edit_"+user.get('username')} className='profile_btn' color='violet'  size='small' fluid type="button"
                                              onClick={() => {this.props.editProfileEventHandler(this.props.editProfile, user);}}>Edit Profile</Button>
                                </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {/*{showReviews}*/}
            </div>

                // <Segment stacked className= 'viewProfile_form'>
                //     <Grid columns={3} textAlign='center' verticalAlign='middle'>
                //         {/*<Grid.Row>*/}
                //             <Grid.Column >
                //                 <Image src={imgsrc} size='small' verticalAlign='middle' className= 'profile_picture'/>
                //             </Grid.Column>
                //             <Grid.Column>
                //                 <Header className= 'show_profile' id="username" as='h1' color='grey'>
                //                     {user.get('username')}
                //                 </Header>
                //                 <Header className= 'show_profile' id="location" as='h5' color='grey'>
                //                     {Map(user.get('location')).get('city')}
                //                 </Header>
                //             </Grid.Column>
                //             <Grid.Column>
                //              <Button id={"edit_"+user.get('username')}  fluid size='large' type="button"
                //               onClick={() => {this.props.editProfileEventHandler(this.props.editProfile, user);}}>Edit Profile</Button>
                //             </Grid.Column>
                //         {/*</Grid.Row>*/}
                //     </Grid>
                // </Segment>
        )}

    render() {
        const user = Map(this.props.users.find((usr)=> usr['username'] === this.props.username));
        const imgsrc = Map(user.get('picture')).get('data');
        const showReview = List(user.get('reviews')).size > 0?
            <DataView value= {List(user.get('reviews')).toArray()} layout="list"
                      itemTemplate={this.itemTemplate}
                      rows={List(user.get('reviews')).size}/>
            : <label htmlFor="noReviews" className="form-text">no reviews</label>;

        const userProfile = this.props.editProfile?
            this.editProfile(): this.viewProfile(user, imgsrc);

        return (
            <div className="profile">
                {userProfile}
                {showReview}
                <Growl ref={(el) => this.growl = el} position="bottomright"/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['app'].get('username'),
        profileUsername: state['viewProfilePage'].get('profileUsername'),
        profilePassword: state['viewProfilePage'].get('profilePassword'),
        profileLocation: state['viewProfilePage'].get('profileLocation'),
        locations: state['app'].get('locations'),
        profilePicture: state['viewProfilePage'].get('profilePicture'),
        prevPicture: state['viewProfilePage'].get('prevPicture'),
        isValid: state['viewProfilePage'].get('isValid'),
        suggestions: state['viewProfilePage'].get('suggestions'),
        users: (List) (state['app'].get('users')).toArray(),
        isConnected: state['app'].get('isConnected'),
        movetoViewProfilePage: state['users'].get('movetoViewProfilePage'),
        showRestForm: state['viewProfilePage'].get('showRestaurantForm'),
        submitMessage: state['viewProfilePage'].get('submitMessage'),
        editProfile: state['viewProfilePage'].get('editProfile'),
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        initViewProfileEventHandler: () =>
        {
            dispatch(UsersActions.movedFromUsersPage());
        },
        updateStateFieldEventHandler: (e, data) => {
            if (data) {
                dispatch(ViewProfilePageActions.updateStateFieldAction(data.id, data.value));
            }
            else
                dispatch(ViewProfilePageActions.updateStateFieldAction(e.target.id, e.target.value));
        },
        editProfileEventHandler: (prevValue, user) => {
            dispatch(ViewProfilePageActions.editProfileAction(prevValue, user));
        },

        showEditProfileEventHandler: (prevValue) => {
            dispatch(ViewProfilePageActions.showEditProfileAction(prevValue));
        },
        validateEditUsernameEventHandler: (e, currName) => {
            dispatch(ViewProfilePageActions.validateEditUsernameAction(e.target.value, currName));
        },
        suggestLocationsEventHandler: (locations, e) => {
            dispatch(ViewProfilePageActions.suggestLocationsAction(locations ,e.query));
        },
        submitEventHandler: (username, password, location, picture, prevPicture, locations, isValid, currentUsername) => {
            dispatch(ViewProfilePageActions.submitEditUserAction(username, password, location, picture, prevPicture, locations, isValid, currentUsername));
        },
        initViewProfileMessageEventHandler:() => {
            dispatch(ViewProfilePageActions.initViewProfileMessageAction());

        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfilePage);
