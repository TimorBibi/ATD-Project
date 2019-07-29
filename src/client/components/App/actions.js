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

function loadCitiesAction(){
    return {
        type: AppActionsConstants.LOAD_CITIES,
        uri: '/api/load/cities'
    }
}

function loadUsersAction(){
    return {
        type: AppActionsConstants.LOAD_USERS,
        uri: '/api/load/users'
    }
}

function loadRestaurantsAction(){
    return {
        type: AppActionsConstants.LOAD_RESTAURANTS,
        uri: '/api/load/restaurants'
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

function loadUsersSuccessAction(users){
    return {
        type: AppActionsConstants.LOAD_USERS_SUCCESS,
        payload: {
            users: users
        }
    }
}

function loadRestaurantsSuccessAction(restaurants){
    return {
        type: AppActionsConstants.LOAD_RESTAURANTS_SUCCESS,
        payload: {
            restaurants: restaurants
        }
    }
}


function updateReviewAfterSubmit(){
    return {
        type: AppActionsConstants.UPDATE_REVIEW_AFTER_SUBMIT,
    }
}

function updateUserAfterSubmit(){
    return {
        type: AppActionsConstants.UPDATE_USER_AFTER_SUBMIT,
    }
}

function setActiveAction(name) {
    return {
        type: AppActionsConstants.SET_ACTIVE,
        payload: {
            name
        }
    };
}



let AppActions  = {
    connectUserAction,
    checkTokenAction,
    appFailureAction,
    disconnectUserAction,
    loadCitiesAction,
    loadCitiesSuccessAction,
    loadUsersAction,
    loadUsersSuccessAction,
    loadRestaurantsAction,
    loadRestaurantsSuccessAction,
    updateReviewAfterSubmit,
    updateUserAfterSubmit,
    setActiveAction,
};

export default AppActions
