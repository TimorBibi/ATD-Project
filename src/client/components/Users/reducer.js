import { UsersActionsConstants} from './constants'
import initialState from '../../initialState'
import {Map} from 'immutable'
import {LogInPageActionsConstants} from "../LogInPage/constants";

const UsersReducer = (state = initialState.restaurants, action) => {
    console.log('Restaurants state=', state);
    console.log('RECEIVED ACTION:', action);

    switch (action.type){
        case UsersActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value);

        case UsersActionsConstants.VIEW_REVIEWS:
            return state.set('showReviews', new Map({
                selectedUser: action.payload.selectedUser,
                visible: action.payload.visible,
            }));

        case UsersActionsConstants.MOVE_TO_MY_PROFILE:
                    return state.set('movetoViewProfilePage', true);

        case UsersActionsConstants.MOVE_FROM_USERS:
            return state.set('movetoViewProfilePage', false);

        case UsersActionsConstants.UPDATE_USERS_TO_SHOW:
            return state.set('usersToShow', action.payload.users);

        case UsersActionsConstants.UPDATE_SEARCH_KEY:
            return state.set('searchKey', action.payload.key);

        case UsersActionsConstants.UPDATE_SEARCH_VALUE:
            return state.set('searchValue', action.payload.value);

        default: //otherwise state is lost!
            return state;
    }
};
export default UsersReducer