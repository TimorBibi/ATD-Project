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

function showReviewsAction(prevReviewValue, currId){
    const prev = prevReviewValue.get('selectedRest');
    const payload = (prev === currId)?
        {selectedRest: currId, visible: !prevReviewValue.get('visible')}:
        {selectedRest: currId, visible: true};
    return {
        type: RestaurantsActionsConstants.VIEW_REVIEWS,
        payload: payload
    }
}

function enableEditReviewAction(prevEditReview, currId){
    const prev = prevEditReview.get('selectedReview');
    const payload = (prev === currId)?
        {selectedReview: currId, edit: !prevEditReview.get('edit')}:
        {selectedReview: currId, edit: true};
    return {
        type: RestaurantsActionsConstants.EDIT_REVIEW,
        payload: payload
    }
}


function restaurantFailureAction(error){
        return {
            type: RestaurantsActionsConstants.RESTAURANTS_FAILURE,
            payload: {
                error: error
            }
        };
}


let RestaurantsActions = {
    toggleRestaurantForm,
    updateStateFieldAction,
    showReviewsAction,
    enableEditReviewAction,
    restaurantFailureAction
};

export default RestaurantsActions