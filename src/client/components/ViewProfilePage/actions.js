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
            user: user
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


function validateEditUsernameAction(name, currName){
    return {
        type: ViewProfilePageActionsConstants.VALIDATE_EDIT_USERNAME,
        uri: '/api/validate/edit/username',
        payload: {
            checkName: name,
            currName: currName
        }
    }
}

function submitEditUserAction(username, password, location, picture, locations, isValid, currentUsername)
{
    if(username.length > 0 && location && picture.contentType !== "" && picture.contentType!==null && password)
    {
        if(!isValid) {
            return {
                type: ViewProfilePageActionsConstants.VALIDATE_EDIT_ACTION_FAILURE,
                payload: {
                    message: `The username is already used,\nplease choose different one.`
                }
            };
        }
        if (locations.find((elm) => elm === location))
            return {
                type: ViewProfilePageActionsConstants.SUBMIT_EDIT_USER,
                uri: '/api/edit/user',
                payload: {
                    currentUsername: currentUsername,
                    username: username,
                    password: password,
                    location: location,
                    picture: picture,
                }
            };
        else
            return {
                type: ViewProfilePageActionsConstants.MISSING_FIELDS,
                payload: {
                    succeed: false,
                    message: "Please choose valid location."
                }
            };
    }
    else
        return {
            type: ViewProfilePageActionsConstants.MISSING_FIELDS,
            payload: {
                succeed: false,
                message: "Please fill in all the fields."
            }
        };
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

function validateEditActionSuccess(isValid){
    if(isValid)
        return {
            type: ViewProfilePageActionsConstants.VALIDATE_EDIT_ACTION_SUCCESS,
        };
    else
        return {
            type: ViewProfilePageActionsConstants.VALIDATE_EDIT_ACTION_FAILURE,
            payload: {
                message: "The username is already used, please choose different one."
            }
        };
}

function validateEditActionFailure(error){
    return {
        type: ViewProfilePageActionsConstants.VALIDATE_EDIT_ACTION_FAILURE,
        payload: {
            error: error
        }
    }
}

function initViewProfileMessageAction() {
    return {
        type: ViewProfilePageActionsConstants.INIT_VIEW_PROFILE_MESSAGE,
    }
}

function submitEditUserSuccessAction(value) {
    return {
        type: ViewProfilePageActionsConstants.SUBMIT_EDIT_USER_SUCCESS,
        payload: {
            message: value.username + ' Edited successfully.'
        }
    }
}

function submitEditUserFailureAction(error){
    return {
        type: ViewProfilePageActionsConstants.SUBMIT_EDIT_USER_FAILURE,
        payload: {
            error: error
        }
    }
}


let ViewProfilePageActions = {
    toggleRestaurantForm,
    updateStateFieldAction,
    editProfileAction,
    showEditProfileAction,
    validateEditUsernameAction,
    submitEditUserAction,
    validateEditActionSuccess,
    validateEditActionFailure,
    suggestLocationsAction,
    getPasswordSuccessAction,
    initViewProfileMessageAction,
    submitEditUserSuccessAction,
    submitEditUserFailureAction
};

export default ViewProfilePageActions