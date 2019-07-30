import React from 'react';
import './ViewProfilePage.scss';
import {connect} from 'react-redux';
import UsersActions from "../Users/actions";
import AddReview from "../AddReview/AddReview";
import {Button, Form, Input} from "semantic-ui-react";
import {DataView} from "primereact/components/dataview/DataView";
import ViewProfilePageActions from "./actions";
import {Growl} from "primereact/components/growl/Growl";
import {InputText} from "primereact/components/inputtext/InputText";
import {Password} from "primereact/components/password/Password";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
const {Map, List} = require('immutable');
import Review from "../Review/Review";


class ViewProfilePage extends React.Component {

    componentDidMount() {
        // getUserProp
        if(this.props.movetoViewProfilePage)
        {
            this.initViewProfileEventHandler();
        }
    }

    componentDidUpdate() {
        // if(this.props.submitMessage.message) {
        //     if (this.props.submitMessage.succeed)
        //         this.growl.show({severity: 'success', summary: this.props.submitMessage.message});
        //     else
        //         this.growl.show({severity: 'error', summary: this.props.submitMessage.message});
        //     this.props.initViewProfileMessageEventHandler();
        // }
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
                pictureType: file.type,
                pictureData: pictureData,
            };
            this.props.updateStateFieldEventHandler(e, {id:'picture' ,value: value});
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
           <div className="editProfile">
               <Growl ref={(el) => this.growl = el} position="bottomright"/>
               <Form className="editProfile-form" onSubmit={() => {
                   this.props.submitEventHandler(
                       this.props.profileUsername,
                       this.props.profilePassword,
                       this.props.profileLocation,
                       this.props.profilePicture,
                       this.props.locations,
                        this.props.isValid,
                        this.props.username);
                       this.props.showEditProfileEventHandler(this.props.editProfile);
               }}>
                   <Form.Field width='9'>
                    {/*<span className="p-float-label">*/}
                       <label htmlFor="profileUsername" className="form-text">Username:</label>
                       <InputText id="profileUsername" value={this.props.profileUsername} onChange={this.props.updateStateFieldEventHandler}
                                    onBlur={(e)=>this.props.validateEditUsernameEventHandler(e, this.props.profileUsername)} />
                    {/*</span>*/}
                   </Form.Field>
                   <Form.Field width='9'>
                      {/*<span className="p-float-label">*/}
                       <label htmlFor="profilePassword" className="form-text">Password:</label>
                       <Password id='profilePassword'
                                   onChange={this.props.updateStateFieldEventHandler}/>
                      {/*</span>*/}
                   </Form.Field>
                   <Form.Field width='9'>
                       <Input type="file" id="picture"  accept="image/*" onChange={this.downloadFile}/>
                       <div className="imgPreview" id='profilePicture'>
                           <img src={imgsrc} width="200" height="100"/>
                       </div>
                   </Form.Field>
                   <Form.Field width='9'>
                       <label htmlFor="profileLocation" className="form-text">Location:</label>
                       <AutoComplete id='profileLocation' value={this.props.profileLocation}
                                     onChange={this.props.updateStateFieldEventHandler}
                                     suggestions={this.props.suggestions}
                                     completeMethod={(e) => this.props.suggestLocationsEventHandler(this.props.locations, e)} />
                   </Form.Field>
                   <Form.Button content='Save' type="submit"/>
                   <button className="ui button" type="button"
                                onClick={() => this.props.showEditProfileEventHandler(this.props.editProfile)} >Cancel</button>
           </Form>
           </div>
       );
    }

    viewProfile(user, imgsrc, addReview)
    {
        return (<div className="viewProfile">
            <Form className="viewProfile-form" key={user.get('username')}>
                <Form.Field width='9'>
                    <h2 id="userName">{user.get('username')}</h2>
                </Form.Field>
                <Form.Field width='9'>
                    <div className="imgPreview">
                        <img src={imgsrc} width="200" height="100"/>
                    </div>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="location">Location:</label>
                    <p id="location">{Map(user.get('location')).get('city')} </p>
                </Form.Field>
            </Form>
            <Button id={"edit_"+user.get('userName')}  className="ui button" type="button"
                    onClick={() => {
                        this.props.editProfileEventHandler(this.props.editProfile, user);
                        this.props.toggleRestaurantFormEventHandler(true);
                    }}
            >Edit Profile</Button>
            <Button label="Add Review" icon="plus" type="button" onClick={() => this.props.toggleRestaurantFormEventHandler(this.props.showRestForm)}/>
            {addReview}
        </div>);
    }

    render() {
        const user = Map(this.props.users.find((usr)=> usr['username'] === this.props.username));
        const imgsrc = Map(user.get('picture')).get('data');
        const addReview = this.props.showRestForm? <AddReview/>: null;
        const showReview = List(user.get('reviews')).size > 0?
            <DataView value= {List(user.get('reviews')).toArray()} layout="list"
                      itemTemplate={this.itemTemplate}
                      rows={List(user.get('reviews')).size}/>
            : <label htmlFor="noReviews" className="form-text">no reviews</label>;

        const userProfile = this.props.editProfile?
            this.editProfile(): this.viewProfile(user, imgsrc, addReview);

        return (
            <div className="profile">
                {userProfile}
                {showReview}
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
        toggleRestaurantFormEventHandler: (currVal) => {
            dispatch(ViewProfilePageActions.toggleRestaurantForm(currVal));
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
        submitEventHandler: (username, password, location, picture, locations, isValid, currentUsername) => {
            dispatch(ViewProfilePageActions.submitEditUserAction(username, password, location, picture, locations, isValid, currentUsername));
        },
        initViewProfileMessageEventHandler:() => {
            dispatch(ViewProfilePageActions.initViewProfileMessageAction());

        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfilePage);
