import { ReviewActionsConstants} from './constants'
import initialState from '../../initialState'
import {Map,List} from 'immutable'

const ReviewReducer = (state = initialState.review, action) => {
    console.log('Restaurants state=', state);
    console.log('RECEIVED ACTION:', action);

    switch (action.type){
        case ReviewActionsConstants.TOGGLE_FORM:
            return state.set('showRestaurantForm', action.payload.newVal)
                .set('submitMessage', {succeed: false, message: ''});

        case ReviewActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value)
                .set('submitMessage', {succeed: false, message: ''});

        case ReviewActionsConstants.UPDATE_SLIDER_FIELD:
            return state.set('ratingRangeValues', action.payload.value);

        case ReviewActionsConstants.VIEW_REVIEWS:
            return state.set('showReviews', new Map({
                selectedRest: action.payload.selectedRest,
                visible: action.payload.visible,
            })).set('reviewsToShow', action.payload.reviews)
        .set('sortReviewValue', 'sortReviewValue:newFirst')
            .set('showOnlyReviewValue', 'showOnlyReviewValue:all')
            .set('criteriaReviewValue', 'criteriaReviewValue:')
            .set('ratingRangeReviewValues', [1,5]);

        case ReviewActionsConstants.EDIT_REVIEW:
            return state.set('editReview', action.payload.editReview)
                .set('avgRate', action.payload.avgRate)
                .set('bathroomRate', action.payload.bathroom)
                .set('staffRate', action.payload.staff)
                .set('cleanRate', action.payload.clean)
                .set('foodRate', action.payload.food)
                .set('driveInRate', action.payload.driveIn)
                .set('deliveryRate', action.payload.delivery)
                .set('freeText', action.payload.freeText)
                .set('picture', action.payload.picture);

        case ReviewActionsConstants.UPDATE_RESTAURANTS_TO_SHOW:
            const restaurants = (List)(action.payload.restaurants).sortBy((rest)=> -1*rest.avgRate);
            return state.set('restaurantsToShow', restaurants);

        case ReviewActionsConstants.UPDATE_REST_SEARCH_VALUE:
            return state.set('searchNameValue', '')
                        .set('searchLocationValue', '')
                        .set('ratingRangeValues', [1,5]);

        case ReviewActionsConstants.UPDATE_REVIEWS_TO_SHOW:
            //TODO: parse timestamp here
            // const reviews = (List)(action.payload.reviews).sortBy((user)=> user.username);
            console.log("wwwwwwww", action.payload.reviews);
            return state.set('reviewsToShow', action.payload.reviews);
            // return state.set('usersToShow', reviews);

        case ReviewActionsConstants.UPDATE_SEARCH_REVIEW:
            return state.set(action.payload.key, action.payload.key+":"+action.payload.value);

        case ReviewActionsConstants.UPDATE_REVIEW_SLIDER_FIELD:
            return state.set('ratingRangeReviewValues', action.payload.value);

        case ReviewActionsConstants.UPDATE_REVIEW_SEARCH_VALUE:
            return state.set('sortReviewValue', 'sortReviewValue:newFirst')
                .set('showOnlyReviewValue', 'showOnlyReviewValue:all')
                .set('criteriaReviewValue', 'criteriaReviewValue:')
                .set('ratingRangeReviewValues', [1,5]);

//TODO: delete both cases of edit
        case ReviewActionsConstants.SUBMIT_EDIT_REVIEW_SUCCEED:
            return state.set('submitMessage', {succeed: false, message: ''});


        case ReviewActionsConstants.SUBMIT_EDIT_REVIEW_FAILURE:
            return state.set('submitMessage', {succeed: false, message: ''});


        default: //otherwise state is lost!
            return state;
    }
};
export default ReviewReducer