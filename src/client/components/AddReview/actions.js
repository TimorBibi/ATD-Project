import { AddReviewActionsConstants } from './constants';

function updateStateFieldAction(field, value) {
    return {
        type: AddReviewActionsConstants.UPDATE_STATE_FIELD,
        payload: {
            field,
            value,
        }
    }
}

function suggestLocationsAction(fullList, subString){
    const suggestedLocations =
        fullList.filter(elm => {
            return elm.toLowerCase().startsWith(subString.toLowerCase());
        });
    return {
        type: AddReviewActionsConstants.SUGGEST_LOCATION,
        payload: {
            suggestedLocations: suggestedLocations
        }
    }
}

function submitReviewAction(name, location){
    if(name && location)
        return {
            type: AddReviewActionsConstants.SUBMIT_REVIEW,
            uri: '/api/submit/review',
            payload: {
                name: name,
                location: location,
            }
        };
    else
        return {
            type: AddReviewActionsConstants.MISSING_FIELD,
            payload: {
                name: name,
                location: location,
            }
        };
}


function submitReviewSucceedAction({succeed, message}){
    if (!succeed)
        return {
            type: AddReviewActionsConstants.SUBMIT_REVIEW_FAILURE,
            payload: {
                message: message,
            }
        }
    else
        return {type: AddReviewActionsConstants.SUBMIT_REVIEW_SUCCEED,};
}

function reviewFailureAction(error){
    return {
        type: AddReviewActionsConstants.ADD_REVIEW_FAILURE,
        payload: {
            error: error
        }
    };
}



let AddReviewActions = {
    updateStateFieldAction,
    suggestLocationsAction,
    submitReviewAction,
    submitReviewSucceedAction,
    reviewFailureAction
};

export default AddReviewActions