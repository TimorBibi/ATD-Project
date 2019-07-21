import { LogInPageActionsConstants } from './constants';

function updateStateFieldAction(field, value) {
    return {
        type: LogInPageActionsConstants.UPDATE_STATE_FIELD,
        payload: {
            field,
            value,
        }
    };
}

function LogInPageFailureAction(error){
    return {
        type: LogInPageActionsConstants.LOGIN_FAILURE,
        payload: {
            error: error
        }
    };
}

function validateUserAction(username, password){
    if(username && password) {
        return {
            type: LogInPageActionsConstants.VALIDATE_USER,
            uri: '/api/validate/user',
            payload: {
                username: username,
                password: password,
            }
        };
    }
    else if (username)
        return {
            type: LogInPageActionsConstants.MISSING_PASSWORD,
            message: "Please enter password.",
        };
    else
        return {
            type: LogInPageActionsConstants.MISSING_USERNAME,
            message: "Please enter username.",
        };
}

function validateUserSuccessAction(payload){
    if (!payload.succeed){
        return {
            type: LogInPageActionsConstants.FALSE_VALIDATE_USER,
            payload: payload,
        }
    } else
        return {
            type: LogInPageActionsConstants.SUCCESS_VALIDATE_USER,
        }
}


let LogInPageActions = {
    updateStateFieldAction,
    LogInPageFailureAction,
    validateUserAction,
    validateUserSuccessAction,
};

export default LogInPageActions