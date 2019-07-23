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

function submitReviewAction(username, name, location, bathroom, staff, clean, food, driveIn, delivery, picture, freeText, isValid){
    if(username && name && location && isValid) {
        let time = new Date().toJSON();
        console.log("FREE TEXT: ", freeText, "PICTURE: ", JSON.stringify(picture));
        return {
            type: AddReviewActionsConstants.SUBMIT_REVIEW,
            uri: '/api/submit/review',
            payload: {
                username: username,
                name: name,
                location: location,
                bathroom: bathroom,
                staff: staff,
                clean: clean,
                food: food,
                driveIn: driveIn,
                delivery: delivery,
                picture: picture,
                freeText: freeText,
                timeStamp: time,
            }
        };
    }
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

function validateLocationAction(location, locationsArray) {
    if (locationsArray.find((elm) => elm === location))
        return {
            type: AddReviewActionsConstants.VALIDATE_LOCATION,
            payload: {
                succeed: true,
                submitMessage: {
                    succeed: true,
                    message: ''
                }
            }
        };
    else
        return {
            type: AddReviewActionsConstants.VALIDATE_LOCATION,
            payload: {
                succeed: false,
                submitMessage: {
                    succeed: false,
                    message: "Please choose valid location."
                }
            }
        };
}

let AddReviewActions = {
    updateStateFieldAction,
    suggestLocationsAction,
    submitReviewAction,
    submitReviewSucceedAction,
    reviewFailureAction,
    validateLocationAction,
};

export default AddReviewActions