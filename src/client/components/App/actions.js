import { AppActionsConstants} from './constants.js';

function connectUserAction({succeed, username}){
    return {
        type: AppActionsConstants.CONNECT_USER,
        payload: {
            succeed: succeed,
            username: username
        }
    }
}

function checkTokenAction(){
    return {
        type: AppActionsConstants.CHECK_TOKEN,
        uri: 'api/checkToken'
    }
}

function appFailureAction(error){
    return {
        type: AppActionsConstants.APP_FAILURE,
        error: error,
    }
}

function disconnectUserAction(){
    return {
        type: AppActionsConstants.DISCONNECT_USER,
        uri: 'api/disconnect/user'
    }
}

let AppActions  = {
    connectUserAction,
    checkTokenAction,
    appFailureAction,
    disconnectUserAction,
};

export default AppActions
