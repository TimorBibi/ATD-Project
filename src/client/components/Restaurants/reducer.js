import { RestaurantsActionsConstants} from './constants'
import initialState from '../../initialState'
import {Map} from 'immutable'

const RestaurantsReducer = (state = initialState.restaurants, action) => {
    console.log('Restaurants state=', state);
    console.log('RECEIVED ACTION:', action);

    switch (action.type){
        case RestaurantsActionsConstants.TOGGLE_FORM:
            return state.set('showRestaurantForm', action.payload.newVal)
                .set('submitMessage', {succeed: false, message: ''});

        case RestaurantsActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value)
                .set('submitMessage', {succeed: false, message: ''});

        case RestaurantsActionsConstants.VIEW_REVIEWS:
            return state.set('showReviews', new Map({
                selectedRest: action.payload.selectedRest,
                visible: action.payload.visible,
            }));

        case RestaurantsActionsConstants.EDIT_REVIEW:
            return state.set('editReview', new Map({
                selectedReview: action.payload.selectedReview,
                edit: action.payload.edit,
            }));

        default: //otherwise state is lost!
            return state;
    }
};
export default RestaurantsReducer