import { ReviewActionsConstants } from './constants';
import {UsersActionsConstants} from "../Users/constants";

function toggleRestaurantForm(currVal) {
    let newVal = !currVal;
    return {
        type: ReviewActionsConstants.TOGGLE_FORM,
        payload: {
            newVal: newVal
        }
    };
}

function updateStateFieldAction(field, value) {
    return {
        type: ReviewActionsConstants.UPDATE_STATE_FIELD,
        payload: {
            field,
            value,
        }
    }
}

function updateSliderFieldAction(value){
    return {
        type: ReviewActionsConstants.UPDATE_SLIDER_FIELD,
        payload: {
            value
        }
    }
}

function showReviewsAction(prevReviewValue, currId, reviews){
    const prev = prevReviewValue.get('selectedRest');
    const payload = (prev === currId)?
        {selectedRest: currId, visible: !prevReviewValue.get('visible'), reviews: reviews}:
        {selectedRest: currId, visible: true, reviews: reviews};
    return {
        type: ReviewActionsConstants.VIEW_REVIEWS,
        payload: payload
    }
}

function enableEditReviewAction(prevEditReview, reviewContent){
    return {
        type: ReviewActionsConstants.EDIT_REVIEW,
        payload: {
            editReview: !prevEditReview,
            username: reviewContent.get('username'), avgRate: reviewContent.get('avgRate'),
            name: reviewContent.get('name'), location: reviewContent.get('location'),
            bathroom: reviewContent.get('bathroom'), staff: reviewContent.get('staff'),
            clean: reviewContent.get('clean'), food: reviewContent.get('food'),
            driveIn: reviewContent.get('driveIn'), delivery: reviewContent.get('delivery'),
            picture: reviewContent.get('picture'), freeText: reviewContent.get('freeText'),
            timeStamp: reviewContent.get('time'),
        }
    };
}

function submitEditReviewAction(username, name, location, timeStamp, bathroom, staff, clean, food, driveIn, delivery, picture, freeText)
{
    console.log("!!!submitEditReviewAction", bathroom);
    return {
        type: ReviewActionsConstants.SUBMIT_EDIT_REVIEW,
        uri: '/api/submit/edit/review',
        payload: {
            username: username, name: name, location: location,
            bathroom: bathroom, staff: staff, clean: clean,
            food: food, driveIn: driveIn, delivery: delivery,
            picture: picture, freeText: freeText, timeStamp: timeStamp,
        }
    };
}


function submitEditReviewSucceedAction({succeed, message}){
    if (!succeed)
        return {
            type: ReviewActionsConstants.SUBMIT_EDIT_REVIEW_FAILURE,
            payload: {
                message: message,
            }
        };
    else
        return {type: ReviewActionsConstants.SUBMIT_EDIT_REVIEW_SUCCEED,};
}

function editReviewFailureAction(error){
        return {
            type: ReviewActionsConstants.RESTAURANTS_FAILURE,
            payload: {
                error: error
            }
        };
}

function deleteReviewAction(review)
{
    return {
        type: ReviewActionsConstants.DELETE_REVIEW,
        uri: '/api/delete/review',
        payload: {
            review:review
        }
    };
}


function initShowRestaurantsAction(restaurants)
{
    return {
        type: ReviewActionsConstants.UPDATE_RESTAURANTS_TO_SHOW,
        payload: {
            restaurants: restaurants
        }
    }
}

function updateShowRestaurantsAction(restaurants)
{
    return {
        type: ReviewActionsConstants.UPDATE_RESTAURANTS_TO_SHOW,
        payload: {
            restaurants: restaurants
        }
    }
}

function updateSearchValueAction()
{
    return {
        type: ReviewActionsConstants.UPDATE_REST_SEARCH_VALUE,
    }
}

function updateSearchReviewAction(value)
{
    const seperator = value.indexOf(':');
    const key = value.substring(0, seperator);
    const val = value.substring(seperator+1, value.length);

    return {
        type: ReviewActionsConstants.UPDATE_SEARCH_REVIEW,
        payload: {
            key: key,
            value: val
        }
    }
}

function updateShowReviewsAction(reviews)
{
    return {
        type: ReviewActionsConstants.UPDATE_REVIEWS_TO_SHOW,
        payload: {
            reviews: reviews
        }
    }
}

function updateReviewSliderFieldAction(value){
    return {
        type: ReviewActionsConstants.UPDATE_REVIEW_SLIDER_FIELD,
        payload: {
            value
        }
    }
}

function updateReviewSearchValueAction()
{
    return {
        type: ReviewActionsConstants.UPDATE_REVIEW_SEARCH_VALUE,
    }
}


let ReviewActions = {
    updateStateFieldAction,
    enableEditReviewAction,
    submitEditReviewAction,
    submitEditReviewSucceedAction,
    editReviewFailureAction,
    deleteReviewAction,

};

export default ReviewActions