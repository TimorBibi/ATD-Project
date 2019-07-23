import { RegisterPageActionsConstants } from './constants';
import {AddReviewActionsConstants} from "../AddReview/constants";

function updateStateFieldAction(field, value) {
    return {
        type: RegisterPageActionsConstants.UPDATE_STATE_FIELD,
        payload: {
            field,
            value,
        }
    }
}

function validateUsernameAction(name){
    return {
        type: RegisterPageActionsConstants.VALIDATE_USERNAME,
        uri: '/api/validate/username',
        payload: {
            name
        }
    }
}


function RegisterPageFailureAction(error){
    return {
        type: RegisterPageActionsConstants.REGISTER_FAILURE,
        payload: {
            error: error
        }
    }
}

function suggestLocationsAction(fullList, subString){
    const suggestedLocations =
        fullList.filter(elm => {
            return elm.toLowerCase().startsWith(subString.toLowerCase());
        });
    return {
        type: RegisterPageActionsConstants.SUGGEST_LOCATION,
        payload: {
            suggestedLocations: suggestedLocations
        }
    }
}

function validateActionSuccess(isValid){
    return {
        type: RegisterPageActionsConstants.VALIDATE_ACTION_SUCCESS,
        payload: {
            isValid: isValid,
        }
    }
}

function submitUserAction(username, password, location, picture, isValid){
    if(isValid && username.length > 0 && location && picture && password)
        return {
            type: RegisterPageActionsConstants.SUBMIT_USER,
            uri: '/api/submit/user',
            payload: {
                username: username,
                password: password,
                location: location,
                picture: picture,
            }
        }
    else
        return {type: RegisterPageActionsConstants.REGISTER_FAILURE};
}

function validateLocationAction(location, locationsArray) {
    if (locationsArray.find((elm) => elm === location))
        return {
            type: AddReviewActionsConstants.VALIDATE_LOCATION,
            payload: {
                succeed: true,
                message: ''
            }
        };
    else
        return {
            type: AddReviewActionsConstants.VALIDATE_LOCATION,
            payload: {
                succeed: false,
                message: "Please choose valid location."
            }
        };
}




let RegisterPageActions = {
    updateStateFieldAction,
    validateUsernameAction,
    RegisterPageFailureAction,
    suggestLocationsAction,
    validateActionSuccess,
    submitUserAction,
    validateLocationAction,
};

export default RegisterPageActions