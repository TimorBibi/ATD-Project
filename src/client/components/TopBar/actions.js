import { ReviewFormActionsConstants } from './constants';

function updateNameAction(name) {
    return {
        type: ReviewFormActionsConstants.UPDATE_NAME,
        payload: {
            name
        }
    }
}


function addReviewSuccessAction(name){
    return {
        type: ReviewFormActionsConstants.ADD_REVIEW_ACTION_SUCCESS,
        payload: {
            name
        }
    }
}

function addReviewFailureAction(message){
    return {
        type: ReviewFormActionsConstants.ADD_REVIEW_ACTION_FAILURE,
        message
    }
}


function loadReviewsAction() {
    return {
        type: ReviewFormActionsConstants.LOAD_REVIEWS,
        uri: '/api/load/names',
    }
}

function addReviewAction(name) {
    return {
        type: ReviewFormActionsConstants.ADD_REVIEW,
        uri: '/api/add/review',
        payload: {
            name
        }
    }
}



let ReviewFormActions = {
    // updateFormWidth,
    // loadRestsAction,
    loadReviewsAction,
    updateNameAction,
    addReviewAction,
    addReviewSuccessAction,
    addReviewFailureAction
};

export default ReviewFormActions