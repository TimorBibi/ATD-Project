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

function submitReviewAction(username, name, location, bathroom, staff, clean,
                            food, driveIn, delivery, picture, freeText, locations, toggle)
{
    if (username && name && location) {
        if(locations.find((elm) => elm === location)) {
            let time = new Date().toJSON();
            return {
                type: AddReviewActionsConstants.SUBMIT_REVIEW,
                uri: '/api/submit/review',
                payload: {
                    username: username, name: name, location: location,
                    bathroom: bathroom, staff: staff, clean: clean,
                    food: food, driveIn: driveIn, delivery: delivery,
                    picture: picture, freeText: freeText, timeStamp: time,
                    toggle: toggle,
                }
            };
        } else
            return {
                type: AddReviewActionsConstants.MISSING_FIELD,
                payload: {
                    succeed: false,
                    message: "Please choose valid location."
                }
            };
    } else
        return {
            type: AddReviewActionsConstants.MISSING_FIELD,
            payload: {
                succeed: false,
                message: "Please fill in Restaurant name and location."
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
        };
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

function clearFieldsAction()
{
    return{type: AddReviewActionsConstants.CLEAR_FIELDS}
}

let AddReviewActions = {
    updateStateFieldAction,
    suggestLocationsAction,
    submitReviewAction,
    submitReviewSucceedAction,
    reviewFailureAction,
    clearFieldsAction,
};

export default AddReviewActions