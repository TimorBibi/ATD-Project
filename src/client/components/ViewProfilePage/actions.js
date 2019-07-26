import { ViewProfilePageActionsConstants } from './constants';

function toggleRestaurantForm(currVal) {
    let newVal = !currVal;
    return {
        type: ViewProfilePageActionsConstants.TOGGLE_FORM,
        payload: {
            newVal: newVal
        }
    };
}

function updateStateFieldAction(field, value) {
    return {
        type: ViewProfilePageActionsConstants.UPDATE_REST_STATE_FIELD,
        payload: {
            field,
            value,
        }
    }
}


function enableEditReviewAction(prevEditReview, currId, reviewContent){
    const prev = prevEditReview.get('selectedReview');
    const toEdit = (prev === currId)?
        {selectedReview: currId, edit: !prevEditReview.get('edit')}:
        {selectedReview: currId, edit: true};
    return {
        type: ViewProfilePageActionsConstants.EDIT_REVIEW,
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
        type: ViewProfilePageActionsConstants.SUBMIT_EDIT_REVIEW,
        uri: '/api/submit/edit/userreview',
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
            type: ViewProfilePageActionsConstants.SUBMIT_EDIT_REVIEW_FAILURE,
            payload: {
                message: message,
            }
        };
    else
        return {type: ViewProfilePageActionsConstants.SUBMIT_EDIT_REVIEW_SUCCEED,};
}

function editReviewFailureAction(error){
    return {
        type: ViewProfilePageActionsConstants.RESTAURANTS_FAILURE,
        payload: {
            error: error
        }
    };
}

function deleteReviewAction(review)
{
    return {
        type: ViewProfilePageActionsConstants.DELETE_REVIEW,
        uri: '/api/delete/userreview',
        payload: {
            review:review
        }
    };
}


function deleteReviewSucceedAction({succeed, message}){
    if (!succeed)
        return {
            type: ViewProfilePageActionsConstants.DELETE_REVIEW_FAILURE,
            payload: {
                message: message,
            }
        };
    else
        return {type: ViewProfilePageActionsConstants.DELETE_REVIEW_SUCCEED,};
}

function deleteReviewFailureAction(error){
    return {
        type: ViewProfilePageActionsConstants.RESTAURANTS_FAILURE,
        payload: {
            error: error
        }
    };
}


let ViewProfilePageActions = {
    toggleRestaurantForm,
    updateStateFieldAction,
    enableEditReviewAction,
    submitEditReviewAction,
    submitEditReviewSucceedAction,
    editReviewFailureAction,
    deleteReviewAction,
    deleteReviewSucceedAction,
    deleteReviewFailureAction,
};

export default ViewProfilePageActions