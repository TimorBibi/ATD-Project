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
import RestaurantsActions from "../Restaurants/actions";
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
        console.log("pipipi", review.picture.data !== null);
        const reviewImg = review.picture.data !== null?
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
        const reviewImg = review.picture.data !== null?
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
                      this.props.makeEditableEventHandler(e, this.props.editReview, review);
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
                             onClick={(e) => this.props.makeEditableEventHandler(e, this.props.editReview, review)} >Cancel</Form.Button>
                <hr/>
            </Form>
        );
    }


    itemTemplate(review, layout) {
        if (layout === 'list') {
            const editable =
                (<div>
                    <Button id={review.username+"_"+review.timeStamp}  className="ui button"
                            onClick={(e) => this.props.makeEditableEventHandler(e, this.props.editReview, review)}>Edit</Button>
                    <Button id={"delete_"+ review.username+"_"+review.timeStamp}  className="ui button"
                            onClick={() => this.props.deleteReviewEventHandler(review)}>Delete</Button>
                </div>);

            return ((this.props.editReview.get('selectedReview') === review.username+"_"+review.timeStamp
                && this.props.editReview.get('edit')) ?
                this.editReviewItem(review): this.viewReviewItem(review, editable));
        }
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
        return (
            <div>
                    <h2 id="usernameValue">{this.props.username}</h2>
                <div className="imgPreview">
                    <img src={imgsrc} width="200" height="100"/>
                </div>
                    <h5><label htmlFor="locationLabel" className="form-text">Location:    </label>
                    <label htmlFor="locationValue" className="form-text">{Map(user.get('location')).get('city')}</label></h5>
                <Button label="Add Review" icon="plus" onClick={() => this.props.toggleRestaurantFormEventHandler(this.props.showRestForm)}/>
                {addReview}
                {showReview}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['app'].get('username'),
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfilePage);
