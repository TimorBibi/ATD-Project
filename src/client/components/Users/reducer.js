import { UsersActionsConstants} from './constants'
import initialState from '../../initialState'
import {List, Map} from 'immutable'
import {LogInPageActionsConstants} from "../LogInPage/constants";
import {RegisterPageActionsConstants} from "../RegisterPage/constants";

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
            const users = (List)(action.payload.users).sortBy((user)=> user.username);
            return state.set('usersToShow', users)
                .set('usersDidUpdate', action.payload.updated);

        case UsersActionsConstants.UPDATE_SEARCH_KEY:
            let suggestions;
            switch (action.payload.key)
            {
                case 'user':
                    suggestions = action.payload.users.map((user)=> user.username);
                    break;
                case 'location':
                    suggestions = action.payload.locations;
                    break;
                case 'restaurant':
                    suggestions = action.payload.restaurants.map((rest)=> rest.name);
                    break;
            }

            return state.set('searchKey', action.payload.key)
                        .set('selectedSuggestionsOption', suggestions);

        case UsersActionsConstants.SUGGEST_IN_USERS:
            return state.set('suggestions', action.payload.suggested);

        case UsersActionsConstants.UPDATE_USER_SEARCH_VALUE:
            return state.set('searchValue', action.payload.value);

        default: //otherwise state is lost!
            return state;
    }
};
export default UsersReducer