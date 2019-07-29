import initialState from '../../initialState';
import {AppActionsConstants} from './constants.js';
import {TopBarActionsConstants} from "../TopBar/constants";
import {RestaurantsActionsConstants} from "../Restaurants/constants";

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('App RECEIVED ACTION:', action);

    switch (action.type){
        case AppActionsConstants.CONNECT_USER:
            return state.set('isConnected', action.payload.succeed).set('username', action.payload.username);

        case AppActionsConstants.LOAD_CITIES_SUCCESS:
            return state.set('locations', action.payload.locations);

        case AppActionsConstants.LOAD_USERS_SUCCESS:
            return state.set('addedUser', false).set('users', action.payload.users);

        case AppActionsConstants.LOAD_RESTAURANTS_SUCCESS:
            return state.set('addedReview', false).set('restaurants', action.payload.restaurants);

        case AppActionsConstants.UPDATE_REVIEW_AFTER_SUBMIT:
            console.log("!!!!!!!!!UPDATE_REVIEW_AFTER_SUBMIT");
            return state.set('addedReview', true);

        case AppActionsConstants.UPDATE_USER_AFTER_SUBMIT:
            return state.set('addedUser', true);

        case AppActionsConstants.SET_ACTIVE:
            return state.set('activeItem', action.payload.name);

        case RestaurantsActionsConstants.SUBMIT_EDIT_REVIEW_SUCCEED:
            return state.set('submitMessage', {succeed: false, message: ''})
                .set('restaurants', action.payload.restaurants)
                .set('users', action.payload.users);


        case RestaurantsActionsConstants.SUBMIT_EDIT_REVIEW_FAILURE:
            return state.set('submitMessage', {succeed: false, message: ''});

        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
