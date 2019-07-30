import { ViewProfilePageActionsConstants } from './constants';
import {RegisterPageActionsConstants} from "../RegisterPage/constants";

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
        type: ViewProfilePageActionsConstants.UPDATE_STATE_FIELD,
        payload: {
            field,
            value,
        }
    }
}


function editProfileAction(prevValue, user) {
    return {
        type: ViewProfilePageActionsConstants.EDIT_PROFILE,
        uri: '/api/get/password',
        payload: {
            prevValue: prevValue,
            user: user,
        }
    }
}

function getPasswordSuccessAction(password){
    return {
        type: ViewProfilePageActionsConstants.UPDATE_PASSWORD,
        payload: password
    }

}
function showEditProfileAction(prevValue) {
    return {
        type: ViewProfilePageActionsConstants.SHOW_EDIT_PROFILE,
        payload: {
            prevValue: prevValue
        }
    }
}


function validateUsernameAction(name, currName){
    return {
        type: ViewProfilePageActionsConstants.VALIDATE_USERNAME,
        uri: '/api/validate/edit/username',
        payload: {
            checkName: name,
            currName: currName
        }
    }
}

function suggestLocationsAction(fullList, subString){
    const suggestedLocations =
        fullList.filter(elm => {
            return elm.toLowerCase().startsWith(subString.toLowerCase());
        });
    return {
        type: ViewProfilePageActionsConstants.SUGGEST_LOCATION,
        payload: {
            suggestedLocations: suggestedLocations
        }
    }
}

function validateActionSuccess(isValid){
    if(isValid)
        return {
            type: ViewProfilePageActionsConstants.VALIDATE_ACTION_SUCCESS,
        };
    else
        return {
            type: ViewProfilePageActionsConstants.VALIDATE_ACTION_FAILURE,
            payload: {
                message: "The username is already used, please choose different one."
            }
        };
}

function initViewProfileMessageAction() {
    return {
        type: ViewProfilePageActionsConstants.INIT_VIEW_PROFILE_MESSAGE,
    }
}


let ViewProfilePageActions = {
    toggleRestaurantForm,
    updateStateFieldAction,
    editProfileAction,
    showEditProfileAction,
    validateUsernameAction,
    validateActionSuccess,
    suggestLocationsAction,
    getPasswordSuccessAction,
    initViewProfileMessageAction,
};

export default ViewProfilePageActions