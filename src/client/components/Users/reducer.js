import { UsersActionsConstants} from './constants'
import initialState from '../../initialState'
import {Map} from 'immutable'

const UsersReducer = (state = initialState.restaurants, action) => {
    console.log('Restaurants state=', state);
    console.log('RECEIVED ACTION:', action);

    switch (action.type){

        case UsersActionsConstants.VIEW_REVIEWS:
            return state.set('showReviews', new Map({
                selectedUser: action.payload.selectedUser,
                visible: action.payload.visible,
            }));

        case UsersActionsConstants.MOVE_TO_MY_PROFILE:
                    return state.set('movetoViewProfilePage', true);

        case UsersActionsConstants.MOVE_FROM_USERS:
            return state.set('movetoViewProfilePage', false);

        default: //otherwise state is lost!
            return state;
    }
};
export default UsersReducer