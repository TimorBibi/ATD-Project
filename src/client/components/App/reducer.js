import initialState from '../../initialState';
import {AppActionsConstants} from './constants.js';

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('App RECEIVED ACTION:', action);

    switch (action.type){
        case AppActionsConstants.CONNECT_USER:
            return state.set('isConnected', action.payload.succeed).set('username', action.payload.username);

        case AppActionsConstants.LOAD_CITIES_SUCCESS:
            return state.set('locations', action.payload.locations);

        case AppActionsConstants.LOAD_USERS_SUCCESS:
            // console.log("!!!!users:", JSON.stringify(action.payload.users));
            return state.set('addedUser', false).set('users', action.payload.users);

        case AppActionsConstants.LOAD_RESTAURANTS_SUCCESS:
            return state.set('addedReview', false).set('restaurants', action.payload.restaurants);

        case AppActionsConstants.UPDATE_REVIEW_AFTER_SUBMIT:
            return state.set('addedReview', true);

        case AppActionsConstants.UPDATE_USER_AFTER_SUBMIT:
            return state.set('addedUser', true);

        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
