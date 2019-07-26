import React from 'react';
import './Users.scss';
import {connect} from 'react-redux';
import {Button, Form} from 'semantic-ui-react'
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {List, Map} from 'immutable';
import {Rating} from 'primereact/rating';
import UsersActions from '../Users/actions';

class Users extends React.Component {

    constructor(){
        super();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.viewUserItem = this.viewUserItem.bind(this);
        this.viewReviewItem = this.viewReviewItem.bind(this);
        // <ViewProfilePage userID={user.username}/> //todo: use it for review component
    }

    componentDidUpdate() {
        if (this.props.movetoViewProfilePage)
            this.props.history.push('/viewProfile'); //reload the root page
    }

    viewUserItem(user, showReviews)
    {
        const imgsrc = user.picture.data;
        const showName = user.username !== this.props.username ? user.username: "My";
        const myProfile = user.username !== this.props.username ? null:
            (<div>
                <Button id={"profile_"+user.username}  className="ui button"
                    onClick={(e) => this.props.moveToUserProfileEventHandler()}
                >Move to My Profile</Button>
            </div>);
        const hasReviews = (!user.reviews.length)?
            (<label htmlFor="reviews">no reviews</label>):
            (<div>
                <Button id={user.username} className="ui button"
                        onClick={(e, data) =>
                            this.props.showUserReviewsEventHandler(data, this.props.showReviews)}
                >View {showName} Reviews</Button>
            </div>);
        return(
            <div className="view-user" key={user.username}>
                <h2 id="userName">{user.username}</h2>
                <label htmlFor="location">Location: </label>
                <p id="location">{user.location.city}</p>
                <div className="imgPreview">
                    <img src={imgsrc} width="200" height="100"/>
                </div>
                {myProfile}
                {hasReviews}
                <hr/>
                {showReviews}
            </div>
        );
    }


    viewReviewItem(review)
    {
        const hasFreeText = review.freeText?
            (<label htmlFor="freeText">Description: {review.freeText}</label>)
            : null;
        const reviewImg = review.picture.data !== null?
            (<div className="imgPreview">
                <img src={review.picture.data} width="200" height="100"/>
            </div>):
            null;

        return(
            <Form className="register-form" key={review.username+"_"+review.timeStamp}>
                <Form.Field width='9'>
                    {reviewImg}
                </Form.Field>
                <Form.Field width='9'>
                    <p id="restaurant">{review.name}</p>
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
                <hr/>
            </Form>)
    }

    itemTemplate(user, layout) {
        if (layout === 'list') {
            const showReviews = ((this.props.showReviews.get('selectedUser') === user.username)
                                && this.props.showReviews.get('visible')) ?
                user.reviews.map((review) => {
                    return (this.viewReviewItem(review));
                })
                : null;
            return (this.viewUserItem(user, showReviews));
        }
    }

    render() {
        return (
            <div className='users'>
                <DataView value={this.props.users} layout="list"
                          itemTemplate={this.itemTemplate}
                          rows={this.props.users.length}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        showRestForm: state['users'].get('showRestaurantForm'),
        isConnected: state['app'].get('isConnected'),
        users: (List) (state['app'].get('users')).toArray(),
        showReviews: state['users'].get('showReviews'),
        username: state['app'].get('username'),
        movetoViewProfilePage: state['users'].get('movetoViewProfilePage'),
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        showUserReviewsEventHandler: (data, prevReviewValue) => {
            dispatch(UsersActions.showUserReviewsAction(prevReviewValue, data.id));
        },
        moveToUserProfileEventHandler:() => {
            dispatch(UsersActions.moveToUserProfileAction());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
