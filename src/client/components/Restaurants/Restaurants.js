import React from 'react';
import './Restaurants.scss';
import {connect} from 'react-redux';
import RestaurantsActions from '../Restaurants/actions';
import {Button, Form, Input} from 'semantic-ui-react'
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {List, Map} from 'immutable'
import AddReview from "../AddReview/AddReview";
import {Rating} from 'primereact/rating'
import {InputTextarea} from 'primereact/inputtextarea';


class Restaurants extends React.Component {

    constructor(){
        super();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.viewRestaurantItem = this.viewRestaurantItem.bind(this);
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

    viewRestaurantItem(restaurant, showReviews)
    {
        return(
            <div className="p-grid">
                <h2 id="name">{restaurant.name}</h2>
                <label htmlFor="location">Location: </label>
                <p id="location">{restaurant.location.city}</p>
                <label htmlFor="avgRate">Rate: </label>
                <p id="avgRate">{restaurant.avgRate}</p>
                <Button id={restaurant.name+"_"+restaurant.location.city}
                        onClick={(e, data) =>
                            this.props.showReviewsEventHandler(data, this.props.showReviews)}
                >View {restaurant.name} Reviews</Button>
                <hr/>
                {showReviews}
            </div>
        );
    }


    viewReviewItem(review, editable)
    {
        const hasFreeText = review.freeText?
            (<label htmlFor="freeText">Description: {review.freeText}</label>)
            : null;
        const reviewImg = review.picture?
            <div className="imgPreview">
                <img src={review.picture.data} width="200" height="100"/>
            </div>:
            null;

        return(
            <div key={review.username+"_"+review.timeStamp}>
                <label htmlFor="writer">Writer: </label>
                <p id="writer">{review.username}</p>
                {reviewImg}
                {/*<label htmlFor="avgReviewRate">Review Rate: </label>*/}
                {/*<p id="avgReviewRate">{review.avgRate}</p>*/}
                {/*<label htmlFor="timestamp">Created at: </label>*/}
                {/*<p id="timestamp">{review.timeStamp}</p>*/}
                <label htmlFor="bathroomRate">Bathroom Quality:</label>
                <Rating value={review.bathroom} readonly={true} stars={5} cancel={false}/>
                <label htmlFor="staffRate">Staff Kindness:</label>
                <Rating value={review.staff} readonly={true} stars={5} cancel={false}/>
                <label htmlFor="cleanRate">Cleanliness:</label>
                <Rating value={review.clean} readonly={true} stars={5} cancel={false}/>
                <label htmlFor="foodRate">Food Quality:</label>
                <Rating value={review.food} readonly={true} stars={5} cancel={false}/>
                <label htmlFor="driveInRate">Drive-thru Quality:</label>
                <Rating value={review.driveIn} readonly={true} stars={5} cancel={true}/>
                <label htmlFor="deliveryRate">Delivery Speed:</label>
                <Rating value={review.delivery} readonly={true} stars={5} cancel={true}/>
                {hasFreeText}
                {editable}
                <hr/>
            </div>);
    }

    editReviewItem(review, editable)
    {

        const reviewImg = review.picture?
            <div className="imgPreview">
                <img src={review.picture.data} width="200" height="100"/>
            </div>:
            null;

        return(
            <div key={review.username+"_"+review.timeStamp}>
                <label htmlFor="writer">Writer: </label>
                <p id="writer">{review.username}</p>
                <Input type="file" id="picture"  accept="image/*" onChange={this.downloadFile}/>
                {reviewImg}
                {/*<label htmlFor="avgRate">Review Rate: </label>*/}
                {/*<p id="avgRate">{this.props.avgRate}</p>*/}
                <label htmlFor="bathroomRate" className="form-text">Bathroom Quality:</label>
                <Rating id='bathroomRate' value={this.props.bathroomRate} cancel={false}
                        onChange={this.props.updateStateFieldEventHandler}/>
                <label htmlFor="staffRate">Staff Kindness:</label>
                <Rating id='staffRate' value={this.props.staffRate}  stars={5} cancel={false}
                        onChange={this.props.updateStateFieldEventHandler}/>
                <label htmlFor="cleanRate">Cleanliness:</label>
                <Rating id='cleanRate' value={this.props.cleanRate}  stars={5} cancel={false}
                        onChange={this.props.updateStateFieldEventHandler}/>
                <label htmlFor="foodRate">Food Quality:</label>
                <Rating id='foodRate' value={this.props.foodRate} stars={5} cancel={false}
                        onChange={this.props.updateStateFieldEventHandler}/>
                <label htmlFor="driveInRate">Drive-thru Quality:</label>
                <Rating id='driveInRate' value={this.props.driveInRate}  stars={5}
                        onChange={this.props.updateStateFieldEventHandler}/>
                <label htmlFor="deliveryRate">Delivery Speed:</label>
                <Rating id='deliveryRate' value={this.props.deliveryRate} stars={5}
                        onChange={this.props.updateStateFieldEventHandler}/>
                <label htmlFor="freeText">Description: </label>
                <InputTextarea id="freeText" value={this.props.freeText}
                               onChange={this.props.updateStateFieldEventHandler}/>
                {editable}
                <hr/>
            </div>
        );
    }


    itemTemplate(restaurant, layout) {
        if (layout === 'list') {
            const showReviews = ((this.props.showReviews.get('selectedRest') === restaurant.name+"_"+restaurant.location.city)
                                && this.props.showReviews.get('visible')) ?
                restaurant.reviews.map((review) => {
                    const editable = review.username !== this.props.username ? null:
                        <Button id={review.username+"_"+review.timeStamp}
                        onClick={(e) => this.props.makeEditableEventHandler(e, this.props.editReview, review)}>
                            edit</Button>;

                    return ((this.props.editReview.get('selectedReview') === review.username+"_"+review.timeStamp)
                                        && this.props.editReview.get('edit')) ?
                        this.editReviewItem(review, editable): this.viewReviewItem(review, editable);
                })
                : null;
            return (this.viewRestaurantItem(restaurant, showReviews));
        }
    }

    //TODO validate filled props
    //TODO display all the restaurants
    render() {
        const allowAddReview = !this.props.isConnected ? null :
            <Button label="Add Review" icon="plus" onClick={() => this.props.toggleRestaurantFormEventHandler(this.props.showRestForm)}/>

        const addReview = this.props.showRestForm? <AddReview/>: null;
        return (
            <div className='restaurants'>
                {allowAddReview}
                {addReview}
                <DataView value={this.props.restaurants} layout="list"
                          itemTemplate={this.itemTemplate}
                          rows={this.props.restaurants.length}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        showRestForm: state['restaurants'].get('showRestaurantForm'),
        isConnected: state['app'].get('isConnected'),
        restaurants: (List) (state['app'].get('restaurants')).toArray(),
        showReviews: state['restaurants'].get('showReviews'),
        editReview: state['restaurants'].get('editReview'),
        username: state['app'].get('username'),
        bathroomRate: state['restaurants'].get('bathroomRate'),
        staffRate: state['restaurants'].get('staffRate'),
        cleanRate: state['restaurants'].get('cleanRate'),
        foodRate: state['restaurants'].get('foodRate'),
        driveInRate: state['restaurants'].get('driveInRate'),
        deliveryRate: state['restaurants'].get('deliveryRate'),
        avgRate: state['restaurants'].get('avgRate'),
        freeText: state['restaurants'].get('freeText'),
        picture: state['restaurants'].get('picture'),
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleRestaurantFormEventHandler: (currVal) => {
             dispatch(RestaurantsActions.toggleRestaurantForm(currVal));
         },
        updateStateFieldEventHandler: (e) => {
            dispatch(RestaurantsActions.updateStateAction(e.target.id, e.target.value));
        },
        showReviewsEventHandler: (data, prevReviewValue) => {
            dispatch(RestaurantsActions.showReviewsAction(prevReviewValue, data.id));
        },
        makeEditableEventHandler: (e, prevEditReview, reviewContent) => {
            dispatch(RestaurantsActions.enableEditReviewAction(prevEditReview, e.target.id, reviewContent))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
