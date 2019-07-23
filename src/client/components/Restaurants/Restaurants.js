import React from 'react';
import './Restaurants.scss';
import {connect} from 'react-redux';
import RestaurantsActions from '../Restaurants/actions';
import { Button } from 'semantic-ui-react'
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {List} from 'immutable'
import AddReview from "../AddReview/AddReview";
import {Rating} from 'primereact/rating'
import {InputTextarea} from 'primereact/inputtextarea';


class Restaurants extends React.Component {

    constructor(){
        super();
        this.itemTemplate = this.itemTemplate.bind(this);
        // <ViewProfilePage userID={user.username}/>
    }


    itemTemplate(restaurant, layout) {
        if (layout === 'list') {
            const showReviews = ((this.props.showReviews.get('selectedRest') === restaurant.name+"_"+restaurant.location.city)
                                && this.props.showReviews.get('visible')) ?
                restaurant.reviews.map((review) => {
                    const editable = review.username !== this.props.username ? null:
                        <Button id={review.username+"_"+review.timeStamp}
                        onClick={(e) => this.props.makeEditableEventHandler(e, this.props.editReview)}>
                            edit</Button>;

                    return ((this.props.editReview.get('selectedReview') === review.username+"_"+review.timeStamp)
                                        && this.props.editReview.get('edit')) ?
                        (<div key={review.username+"_"+review.timeStamp}>
                            <label htmlFor="writer">Writer: </label>
                            <p id="writer">{review.username}</p>
                            <label htmlFor="bathroom">Bathroom: </label>
                            <Rating value={review.bathroom} stars={5} cancel={false} />
                            <label htmlFor="freeText">Review: </label>
                            <InputTextarea value={review.freeText} id="freeText">{review.freeText}</InputTextarea>
                            {editable}
                            <hr/>
                        </div>) :
                        (<div key={review.username+"_"+review.timeStamp}>
                            <label htmlFor="writer">Writer: </label>
                            <p id="writer">{review.username}</p>
                            <label htmlFor="bathroom">Bathroom: </label>
                            <Rating value={review.bathroom} readonly={true} stars={5} cancel={false} />
                            <label htmlFor="freeText">Review: </label>
                            <p id="freeText">{review.freeText}</p>
                            {editable}
                            <hr/>
                        </div>);
                })
                : null;
            return (
                <div className="p-grid">
                    <label htmlFor="name">Name: </label>
                    <p id="name">{restaurant.name}</p>
                    <label htmlFor="location">Location: </label>
                    <p id="location">{restaurant.location.city}</p>
                    <label htmlFor="avgRate">Rate: </label>
                    <p id="avgRate">{restaurant.avgRate}</p>
                    <Button id={restaurant.name+"_"+restaurant.location.city}
                        onClick={(e, data) =>
                            this.props.showReviewsEventHandler(data, this.props.showReviews)}
                    >Change by showReview.visible</Button>
                    <hr/>
                    {showReviews}

                </div>
            );
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
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleRestaurantFormEventHandler: (currVal) => {
             dispatch(RestaurantsActions.toggleRestaurantForm(currVal));
         },
        updateStateFieldEventHandler: (e) => {
            dispatch(RestaurantsActions.updateStateFieldAction(e.target.id, e.target.value));
        },
        showReviewsEventHandler: (data, prevReviewValue) => {
            dispatch(RestaurantsActions.showReviewsAction(prevReviewValue, data.id));
        },
        makeEditableEventHandler: (e, prevEditReview) => {
            dispatch(RestaurantsActions.enableEditReviewAction(prevEditReview, e.target.id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
