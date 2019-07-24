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

function updateStateAction(field, value) {
    return {
        type: RestaurantsActionsConstants.UPDATE_REST_STATE_FIELD,
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


function restaurantFailureAction(error){
        return {
            type: RestaurantsActionsConstants.RESTAURANTS_FAILURE,
            payload: {
                error: error
            }
        };
}

// function closeToggleAfterSubmit(){
//     return {
//         type: RestaurantsActionsConstants.CLOSE_TOGGLE_REVIEW_AFTER_SUBMIT,
//     }
// }


let RestaurantsActions = {
    toggleRestaurantForm,
    updateStateAction,
    showReviewsAction,
    enableEditReviewAction,
    restaurantFailureAction
};

export default RestaurantsActions