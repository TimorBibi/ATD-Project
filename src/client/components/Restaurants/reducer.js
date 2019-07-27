import { RestaurantsActionsConstants} from './constants'
import initialState from '../../initialState'
import {Map,List} from 'immutable'
import {UsersActionsConstants} from "../Users/constants";

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

        case RestaurantsActionsConstants.UPDATE_SLIDER_FIELD:
            return state.set('ratingRangeValues', action.payload.value);

        case RestaurantsActionsConstants.VIEW_REVIEWS:
            return state.set('showReviews', new Map({
                selectedRest: action.payload.selectedRest,
                visible: action.payload.visible,
            }));

        case RestaurantsActionsConstants.EDIT_REVIEW:
            return state.set('editReview', new Map({
                selectedReview: action.payload.editReview.selectedReview,
                edit: action.payload.editReview.edit,
            })).set('avgRate', action.payload.avgRate)
                .set('bathroomRate', action.payload.bathroom)
                .set('staffRate', action.payload.staff)
                .set('cleanRate', action.payload.clean)
                .set('foodRate', action.payload.food)
                .set('driveInRate', action.payload.driveIn)
                .set('deliveryRate', action.payload.delivery)
                .set('freeText', action.payload.freeText)
                .set('picture', action.payload.picture);

        case RestaurantsActionsConstants.UPDATE_RESTAURANTS_TO_SHOW:
            const restaurants = (List)(action.payload.restaurants).sortBy((rest)=> -1*rest.avgRate);
            return state.set('restaurantsToShow', restaurants);

        case RestaurantsActionsConstants.UPDATE_REST_SEARCH_VALUE:
            return state.set('searchNameValue', '')
                        .set('searchLocationValue', '')
                        .set('ratingRangeValues', [1,5]);


//TODO: delete both cases of edit
        case RestaurantsActionsConstants.SUBMIT_EDIT_REVIEW_SUCCEED:
            return state.set('submitMessage', {succeed: false, message: ''});


        case RestaurantsActionsConstants.SUBMIT_EDIT_REVIEW_FAILURE:
            return state.set('submitMessage', {succeed: false, message: ''});


        default: //otherwise state is lost!
            return state;
    }
};
export default RestaurantsReducer