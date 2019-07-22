import { AppActionsConstants} from './constants.js';
import {RegisterPageActionsConstants} from "../RegisterPage/constants";

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

function loadCitiesAction(){
    return {
        type: AppActionsConstants.LOAD_CITIES,
        uri: '/api/load/cities'
    }
}

function loadCitiesSuccessAction(cities){
    const locations = cities.map((elm) => {
        return elm.city;
    });
    return {
        type: AppActionsConstants.LOAD_CITIES_SUCCESS,
        payload: {
            locations: locations
        }
    }
}

let AppActions  = {
    connectUserAction,
    checkTokenAction,
    appFailureAction,
    disconnectUserAction,
    loadCitiesAction,
    loadCitiesSuccessAction,
};

export default AppActions
