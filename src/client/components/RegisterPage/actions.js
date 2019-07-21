import { RegisterPageActionsConstants } from './constants';

function loadCitiesAction(){
    return {
        type: RegisterPageActionsConstants.LOAD_CITIES,
        uri: '/api/load/cities'
    }
}

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

function loadCitiesSuccessAction(cities){
    return {
        type: RegisterPageActionsConstants.LOAD_CITIES_SUCCESS,
        payload: {
            cities: cities
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
    return {
        type: RegisterPageActionsConstants.SUGGEST_LOCATION,
        payload: {
            fullList: fullList,
            subString: subString,
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




let RegisterPageActions = {
    updateStateFieldAction,
    validateUsernameAction,
    loadCitiesAction,
    loadCitiesSuccessAction,
    RegisterPageFailureAction,
    suggestLocationsAction,
    validateActionSuccess,
    submitUserAction,
};

export default RegisterPageActions