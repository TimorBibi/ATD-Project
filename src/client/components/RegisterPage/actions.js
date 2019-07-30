import { RegisterPageActionsConstants } from './constants';

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
        type: RegisterPageActionsConstants.VALIDATE_REGISTER_USERNAME,
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
    if(isValid)
        return {
            type: RegisterPageActionsConstants.VALIDATE_REGISTER_ACTION_SUCCESS,
        };
    else
        return {
            type: RegisterPageActionsConstants.VALIDATE_REGISTER_ACTION_FAILURE,
            payload: {
                message: "The username is already used, please choose different one."
            }
        };
}

function submitUserAction(username, password, location, picture, locations, isValid)
{
    if(username.length > 0 && location && picture.pictureType !== "" && picture.pictureType!==null && password) {
        if(!isValid)
            return {
                type: RegisterPageActionsConstants.VALIDATE_REGISTER_ACTION_FAILURE,
                payload: {
                    message: `The username is already used,\nplease choose different one.`
                }
            };
        if (locations.find((elm) => elm === location))
            return {
                type: RegisterPageActionsConstants.SUBMIT_USER,
                uri: '/api/submit/user',
                payload: {
                    username: username,
                    password: password,
                    location: location,
                    picture: picture,
                }
            };
        else
            return {
                type: RegisterPageActionsConstants.MISSING_REGISTER_FIELDS,
                payload: {
                    succeed: false,
                    message: "Please choose valid location."
                }
            };
    }
    else
        return {
            type: RegisterPageActionsConstants.MISSING_REGISTER_FIELDS,
            payload: {
                succeed: false,
                message: "Please fill in all the fields."
            }
        };
}

function submitUserSuccessAction(value) {
    return {
        type: RegisterPageActionsConstants.SUBMIT_USER_SUCCESS,
        payload: {
            message: value.username + ' submitted.'
        }
    }
}


function initRegisterMessageAction() {
    return {
        type: RegisterPageActionsConstants.INIT_REGISTER_MESSAGE,
    }
}

let RegisterPageActions = {
    updateStateFieldAction,
    validateUsernameAction,
    RegisterPageFailureAction,
    suggestLocationsAction,
    validateActionSuccess,
    submitUserAction,
    submitUserSuccessAction,
    initRegisterMessageAction,
};

export default RegisterPageActions