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

        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
