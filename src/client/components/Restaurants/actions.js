import { RestaurantsActionsConstants } from './constants';

function toggleRestaurantForm(currVal) {
    let newVal = !currVal;
    return {
        type: RestaurantsActionsConstants.TOGGLE_FORM,
        payload: {
            newVal: newVal
        }
    };
}

function updateStateFieldAction(field, value) {
    return {
        type: RestaurantsActionsConstants.UPDATE_STATE_FIELD,
        payload: {
            field,
            value,
        }
    }
}

function updateSliderFieldAction(value){
    return {
        type: RestaurantsActionsConstants.UPDATE_SLIDER_FIELD,
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
        type: RestaurantsActionsConstants.VIEW_REVIEWS,
        payload: payload
    }
}

function enableEditReviewAction(prevEditReview, currId, reviewContent){
    const prev = prevEditReview.get('selectedReview');
    const toEdit = (prev === currId)?
        {selectedReview: currId, edit: !prevEditReview.get('edit')}:
        {selectedReview: currId, edit: true};
    return {
        type: RestaurantsActionsConstants.EDIT_REVIEW,
        payload: {
            editReview: toEdit,
            username: reviewContent.username, avgRate: reviewContent.avgRate, name: reviewContent.name, location: reviewContent.location,
            bathroom: reviewContent.bathroom, staff: reviewContent.staff, clean: reviewContent.clean,
            food: reviewContent.food, driveIn: reviewContent.driveIn, delivery: reviewContent.delivery,
            picture: reviewContent.picture, freeText: reviewContent.freeText, timeStamp: reviewContent.time,
        }
    };
}

function submitEditReviewAction(username, name, location, timeStamp, bathroom, staff, clean, food, driveIn, delivery, picture, freeText)
{
    return {
        type: RestaurantsActionsConstants.SUBMIT_EDIT_REVIEW,
        uri: '/api/submit/edit/review',
        payload: {
            username: username, name: name, location: location,
            bathroom: bathroom, staff: staff, clean: clean,
            food: food, driveIn: driveIn, delivery: delivery,
            picture: picture, freeText: freeText, timeStamp: timeStamp,
        }
    };
}



function deleteReviewAction(review)
{
    return {
        type: RestaurantsActionsConstants.DELETE_REVIEW,
        uri: '/api/delete/review',
        payload: {
            review:review
        }
    };
}


function deleteReviewSucceedAction({succeed, message}){
    if (!succeed)
        return {
            type: RestaurantsActionsConstants.DELETE_REVIEW_FAILURE,
            payload: {
                message: message,
            }
        };
    else
        return {type: RestaurantsActionsConstants.DELETE_REVIEW_SUCCEED,};
}

function deleteReviewFailureAction(error){
    return {
        type: RestaurantsActionsConstants.RESTAURANTS_FAILURE,
        payload: {
            error: error
        }
    };
}

function initShowRestaurantsAction(restaurants)
{
    return {
        type: RestaurantsActionsConstants.UPDATE_RESTAURANTS_TO_SHOW,
        payload: {
            restaurants: restaurants
        }
    }
}

function updateShowRestaurantsAction(restaurants)
{
    return {
        type: RestaurantsActionsConstants.UPDATE_RESTAURANTS_TO_SHOW,
        payload: {
            restaurants: restaurants
        }
    }
}

function updateSearchValueAction()
{
    return {
        type: RestaurantsActionsConstants.UPDATE_REST_SEARCH_VALUE,
    }
}

function updateSearchReviewAction(value)
{
    const seperator = value.indexOf(':');
    const key = value.substring(0, seperator);
    const val = value.substring(seperator+1, value.length);

    return {
        type: RestaurantsActionsConstants.UPDATE_SEARCH_REVIEW,
        payload: {
            key: key,
            value: val
        }
    }
}

function updateShowReviewsAction(reviews)
{
    return {
        type: RestaurantsActionsConstants.UPDATE_REVIEWS_TO_SHOW,
        payload: {
            reviews: reviews
        }
    }
}

function updateReviewSliderFieldAction(value){
    return {
        type: RestaurantsActionsConstants.UPDATE_REVIEW_SLIDER_FIELD,
        payload: {
            value
        }
    }
}

function updateReviewSearchValueAction()
{
    return {
        type: RestaurantsActionsConstants.UPDATE_REVIEW_SEARCH_VALUE,
    }
}


function updateSliderCloserBetterAction(value){
    return {
        type: RestaurantsActionsConstants.UPDATE_CLOSER_BETTER_SLIDER_FIELD,
        payload: {
            value
        }
    }
}

function updateShowReviews(){
    return {
        type: RestaurantsActionsConstants.SHOW_REVIEWS,
    }
}


let RestaurantsActions = {
    toggleRestaurantForm,
    updateStateFieldAction,
    showReviewsAction,
    enableEditReviewAction,
    submitEditReviewAction,
    initShowRestaurantsAction,
    updateShowRestaurantsAction,
    updateSearchValueAction,
    updateSliderFieldAction,
    updateSearchReviewAction,
    updateShowReviewsAction,
    updateReviewSliderFieldAction,
    updateReviewSearchValueAction,
    updateSliderCloserBetterAction,
    updateShowReviews
};

export default RestaurantsActions