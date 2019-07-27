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
    console.log("!!!submitEditReviewAction", bathroom);
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


function submitEditReviewSucceedAction({succeed, message}){
    if (!succeed)
        return {
            type: RestaurantsActionsConstants.SUBMIT_EDIT_REVIEW_FAILURE,
            payload: {
                message: message,
            }
        };
    else
        return {type: RestaurantsActionsConstants.SUBMIT_EDIT_REVIEW_SUCCEED,};
}

function editReviewFailureAction(error){
        return {
            type: RestaurantsActionsConstants.RESTAURANTS_FAILURE,
            payload: {
                error: error
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

let RestaurantsActions = {
    toggleRestaurantForm,
    updateStateFieldAction,
    showReviewsAction,
    enableEditReviewAction,
    submitEditReviewAction,
    submitEditReviewSucceedAction,
    editReviewFailureAction,
    deleteReviewAction,
    deleteReviewSucceedAction,
    deleteReviewFailureAction,
};

export default RestaurantsActions