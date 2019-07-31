import { RestaurantsActionsConstants} from './constants'
import initialState from '../../initialState'
import {Map,List} from 'immutable'
import {RegisterPageActionsConstants} from "../RegisterPage/constants";

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
            })).set('reviewsToShow', action.payload.reviews)
        .set('sortReviewValue', 'sortReviewValue:newFirst')
            .set('showOnlyReviewValue', 'showOnlyReviewValue:all')
            .set('criteriaReviewValue', 'criteriaReviewValue:')
            .set('ratingRangeReviewValues', [1,5]);

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
            // const restaurants = (List)(action.payload.restaurants).sortBy((rest)=> -1*rest.avgRate);
            const restaurants = (List)(action.payload.restaurants);
            return state.set('restaurantsToShow', restaurants);

        case RestaurantsActionsConstants.UPDATE_REST_SEARCH_VALUE:
            return state.set('searchNameValue', '')
                        .set('searchLocationValue', '')
                        .set('ratingRangeValues', [1,5]);

        case RestaurantsActionsConstants.UPDATE_REVIEWS_TO_SHOW:
            return state.set('reviewsToShow', action.payload.reviews);

        case RestaurantsActionsConstants.UPDATE_SEARCH_REVIEW:
            return state.set(action.payload.key, action.payload.key+":"+action.payload.value);

        case RestaurantsActionsConstants.UPDATE_REVIEW_SLIDER_FIELD:
            return state.set('ratingRangeReviewValues', action.payload.value);

        case RestaurantsActionsConstants.UPDATE_REVIEW_SEARCH_VALUE:
            return state.set('sortReviewValue', 'sortReviewValue:newFirst')
                .set('showOnlyReviewValue', 'showOnlyReviewValue:all')
                .set('criteriaReviewValue', 'criteriaReviewValue:')
                .set('ratingRangeReviewValues', [1,5]);

        case RestaurantsActionsConstants.UPDATE_CLOSER_BETTER_SLIDER_FIELD:
            return state.set('closerBetterValues', action.payload.value);

        case RestaurantsActionsConstants.SHOW_REVIEWS:
            return state.set('showReviews', new Map({
                selectedRest: '',
                visible: false,
            }));

        case RestaurantsActionsConstants.SUGGEST_IN_RESTAURANTS:
            return state.set('suggestions', action.payload.suggested);

        default: //otherwise state is lost!
            return state;
    }
};
export default RestaurantsReducer