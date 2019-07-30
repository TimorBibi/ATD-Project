import React from 'react';
import './ViewProfilePage.scss';
import {connect} from 'react-redux';
import UsersActions from "../Users/actions";
import AddReview from "../AddReview/AddReview";
import {Button, Form, Input} from "semantic-ui-react";
import {DataView} from "primereact/components/dataview/DataView";
import ViewProfilePageActions from "./actions";
import {Rating} from "primereact/components/rating/Rating";
import {InputTextarea} from "primereact/components/inputtextarea/InputTextarea";
import {Growl} from "primereact/components/growl/Growl";
import {InputText} from "primereact/components/inputtext/InputText";
import {Password} from "primereact/components/password/Password";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
const {Map, List} = require('immutable');

class ViewProfilePage extends React.Component {

    componentDidMount() {
        // getUserProp
        if(this.props.movetoViewProfilePage)
        {
            this.initViewProfileEventHandler;
        }
    }

    constructor(){
        super();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.viewReviewItem = this.viewReviewItem.bind(this);
        this.editReviewItem = this.editReviewItem.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        // <ViewProfilePage userID={user.username}/>
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


    viewReviewItem(review, editable)
    {
        const hasFreeText = review.freeText?
            (<label htmlFor="freeText">Description: {review.freeText}</label>)
            : null;

        const reviewImg = review.picture.contentType !== "" && review.picture.contentType!==null?
            (<div className="imgPreview">
                <img src={review.picture.data} width="200" height="100"/>
            </div>):
            null;

        return(
            <Form className="register-form" key={review.username+"_"+review.timeStamp}>
                <Form.Field width='9'>
                    <h2 id="restaurantName">{review.name}</h2>
                </Form.Field>
                <Form.Field width='9'>
                    {reviewImg}
                </Form.Field>

                <Form.Field width='9'>
                    <label htmlFor="bathroomRate" className="form-text">Bathroom Quality:</label>
                    <Rating id='bathroomRate' value={review.bathroom} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="staffRate">Staff Kindness:</label>
                    <Rating id='staffRate' value={review.staff}  stars={5} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="cleanRate">Cleanliness:</label>
                    <Rating id='cleanRate' value={review.clean}  stars={5} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="foodRate">Food Quality:</label>
                    <Rating id='foodRate' value={review.food} stars={5} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="driveInRate">Drive-thru Quality:</label>
                    <Rating id='driveInRate' value={review.driveIn}  stars={5} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="deliveryRate">Delivery Speed:</label>
                    <Rating id='deliveryRate' value={review.delivery} stars={5} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    {hasFreeText}
                </Form.Field>
                <br/>
                {editable}
                <hr/>
            </Form>)
    }

    editReviewItem(review)
    {
        const reviewImg = review.picture.contentType !== "" && review.picture.contentType!==null?
            (<div className="imgPreview">
                <img src={review.picture.data} width="200" height="100"/>
            </div>):
            null;
        return (
            <Form className="register-form" key={review.username+"_"+review.timeStamp}
                  onSubmit={(e) => {
                      this.props.submitEditEventHandler(
                          review.username,
                          review.name,
                          review.location,
                          review.timeStamp,
                          this.props.bathroomRate,
                          this.props.staffRate,
                          this.props.cleanRate,
                          this.props.foodRate,
                          this.props.driveInRate,
                          this.props.deliveryRate,
                          this.props.picture,
                          this.props.freeText
                      );
                      Review.makeEditableEventHandler(e, this.props.editReview, review);
                  }}>
                <Form.Field width='9'>
                    <h2 id="restaurantName">{review.name}</h2>
                </Form.Field>
                <Form.Field width='9'>
                    <Input type="file" id="picture"  accept="image/*" onChange={this.downloadFile}/>
                    {reviewImg}
                </Form.Field>

                <Form.Field width='9'>
                    <label htmlFor="bathroomRate" className="form-text">Bathroom Quality:</label>
                    <Rating id='bathroomRate' value={this.props.bathroomRate} cancel={false}
                            onChange={this.props.updateStateFieldEventHandler}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="staffRate">Staff Kindness:</label>
                    <Rating id='staffRate' value={this.props.staffRate}  stars={5} cancel={false}
                            onChange={this.props.updateStateFieldEventHandler}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="cleanRate">Cleanliness:</label>
                    <Rating id='cleanRate' value={this.props.cleanRate}  stars={5} cancel={false}
                            onChange={this.props.updateStateFieldEventHandler}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="foodRate">Food Quality:</label>
                    <Rating id='foodRate' value={this.props.foodRate} stars={5} cancel={false}
                            onChange={this.props.updateStateFieldEventHandler}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="driveInRate">Drive-thru Quality:</label>
                    <Rating id='driveInRate' value={this.props.driveInRate}  stars={5}
                            onChange={this.props.updateStateFieldEventHandler}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="deliveryRate">Delivery Speed:</label>
                    <Rating id='deliveryRate' value={this.props.deliveryRate} stars={5}
                            onChange={this.props.updateStateFieldEventHandler}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="freeText">Description: </label>
                    <InputTextarea id="freeText" value={this.props.freeText}
                                   onChange={this.props.updateStateFieldEventHandler}/>
                </Form.Field>
                <br/>
                {/*{editable}*/}
                <Form.Button id={"edit_" + review.username+"_"+review.timeStamp} content='Submit Review' type="submit"/>
                {/*<Form.Button id={"edit_" + review.username+"_"+review.timeStamp} className="ui button"*/}
                {/*        onClick=  {(e) => submitEditEventHandler(e, review)}>Edit</Form.Button>*/}
                <Form.Button id={"cancel_" + review.username+"_"+review.timeStamp} className="ui button"
                             onClick={(e) => Review.makeEditableEventHandler(e, this.props.editReview, review)} >Cancel</Form.Button>
                <hr/>
            </Form>
        );
    }


    itemTemplate(review, layout) {
        if (layout === 'list') {
            const editable =
                (<div>
                    <Button id={review.username+"_"+review.timeStamp}  className="ui button"
                            onClick={(e) => Review.makeEditableEventHandler(e, this.props.editReview, review)}>Edit</Button>
                    <Button id={"delete_"+ review.username+"_"+review.timeStamp}  className="ui button"
                            onClick={() => this.props.deleteReviewEventHandler(review)}>Delete</Button>
                </div>);

            return ((this.props.editReview.get('selectedReview') === review.username+"_"+review.timeStamp
                && this.props.editReview.get('edit')) ?
                this.editReviewItem(review): this.viewReviewItem(review, editable));
        }
    }

    editProfile(user, imgsrc)
    {
        console.log("&&&&&&&&&", this.props.username,
            this.props.password,
            this.props.location,
            this.props.profilePicture);
       return (
           <div className="editProfile">
               {/*<Growl ref={(el) => this.growl = el} position="bottomright"/>*/}
               <Form className="editProfile-form" onSubmit={() => {
                   this.props.submitEventHandler(
                       this.props.username,
                       this.props.password,
                       this.props.location,
                       this.props.profilePicture,
                       this.props.locations,
                       this.props.isValid);
                       this.props.editProfileEventHandler(this.props.editProfile);
               }}>
                   <Form.Field width='9'>
                    {/*<span className="p-float-label">*/}
                       <label htmlFor="username" className="form-text">Username:</label>
                       <InputText id="username" value={this.props.username} onChange={this.props.updateStateFieldEventHandler}
                                    onBlur={(e)=>this.props.validateUsernameEventHandler(e, this.props.username)} />
                    {/*</span>*/}
                   </Form.Field>
                   <Form.Field width='9'>
                      {/*<span className="p-float-label">*/}
                       <label htmlFor="password" className="form-text">Password:</label>
                       <Password id='password'
                                  value={this.props.password} onChange={this.props.updateStateFieldEventHandler}/>
                      {/*</span>*/}
                   </Form.Field>
                   <Form.Field width='9'>
                       <Input type="file" id="picture"  accept="image/*" onChange={this.downloadFile}/>
                       <div className="imgPreview">
                           <img src={imgsrc} width="200" height="100"/>
                       </div>
                   </Form.Field>
                   <Form.Field width='9'>
                       <label htmlFor="location" className="form-text">Location:</label>
                       <AutoComplete id='location' value={this.props.location}
                                     onChange={this.props.updateStateFieldEventHandler}
                                     suggestions={this.props.suggestions}
                                     completeMethod={(e) => this.props.suggestLocationsEventHandler(this.props.locations, e)} />
                   </Form.Field>
                   <Form.Button content='Save' type="submit"/>
                   <Form.Button className="ui button"
                                onClick={() => this.props.editProfileEventHandler(this.props.editProfile)} >Cancel</Form.Button>
               </Form>
           </div>
       );
    }

    viewProfile(user, imgsrc, addReview)
    {
        return (<div>
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
            <Button id={"edit_"+user.get('userName')}  className="ui button"
                    onClick={() => this.props.editProfileEventHandler(this.props.editProfile)}>Edit Profile</Button>
            <Button label="Add Review" icon="plus" onClick={() => this.props.toggleRestaurantFormEventHandler(this.props.showRestForm)}/>
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
            this.editProfile(user, imgsrc): this.viewProfile(user, imgsrc, addReview);

        return (
            <div>
                {userProfile}
                {showReview}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['app'].get('username'),
        password: state['registerPage'].get('password'),
        location: state['registerPage'].get('location'),
        locations: state['registerPage'].get('locations'),
        profilePicture: state['registerPage'].get('picture'),
        isValid: state['registerPage'].get('isValid'),
        suggestions: state['registerPage'].get('suggestions'),

        users: (List) (state['app'].get('users')).toArray(),
        isConnected: state['app'].get('isConnected'),
        movetoViewProfilePage: state['users'].get('movetoViewProfilePage'),
        showRestForm: state['viewProfilePage'].get('showRestaurantForm'),
        submitMessage: state['viewProfilePage'].get('submitMessage'),

        editReview: state['viewProfilePage'].get('editReview'),
        bathroomRate: state['viewProfilePage'].get('bathroomRate'),
        staffRate: state['viewProfilePage'].get('staffRate'),
        cleanRate: state['viewProfilePage'].get('cleanRate'),
        foodRate: state['viewProfilePage'].get('foodRate'),
        driveInRate: state['viewProfilePage'].get('driveInRate'),
        deliveryRate: state['viewProfilePage'].get('deliveryRate'),
        avgRate: state['viewProfilePage'].get('avgRate'),
        freeText: state['viewProfilePage'].get('freeText'),
        picture: state['viewProfilePage'].get('picture'),
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
        makeEditableEventHandler: (e, prevEditReview, reviewContent) => {
            dispatch(ViewProfilePageActions.enableEditReviewAction(prevEditReview, e.target.id, reviewContent))
        },
        deleteReviewEventHandler: (reviewContent) => {
            dispatch(ViewProfilePageActions.deleteReviewAction(reviewContent));
        },
        submitEditEventHandler: (username, name, location, timeStamp, bathroom, staff, clean, food, driveIn, delivery, picture, freeText) => {
            dispatch(ViewProfilePageActions.submitEditReviewAction(
                username,
                name,
                location,
                timeStamp,
                bathroom,
                staff,
                clean,
                food,
                driveIn,
                delivery,
                picture,
                freeText));
        },
        editProfileEventHandler: (prevValue) => {
            dispatch(ViewProfilePageActions.editProfileAction(prevValue));
        },
        validateUsernameEventHandler: (e, currName) => {
            dispatch(ViewProfilePageActions.validateUsernameAction(e.target.value, currName));
        },
        suggestLocationsEventHandler: (locations, e) => {
            dispatch(ViewProfilePageActions.suggestLocationsAction(locations ,e.query));
        },
        submitEventHandler: (username, password, location, picture, locations, isValid) => {
            dispatch(ViewProfilePageActions.submitUserAction(username, password, location, picture, locations, isValid));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfilePage);
