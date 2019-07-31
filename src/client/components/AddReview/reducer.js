import { AddReviewActionsConstants } from './constants'
import initialState from '../../initialState'
import {RegisterPageActionsConstants} from "../RegisterPage/constants";

const AddReviewReducer = (state = initialState.addReview, action) => {
    console.log('AddReviewReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case AddReviewActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value);

        case AddReviewActionsConstants.SUGGEST_LOCATION:
            return state.set('suggestions', action.payload.suggestedLocations);

        case AddReviewActionsConstants.SUBMIT_REVIEW_SUCCEED:
            return state.set('showRestaurantForm', false);

        case AddReviewActionsConstants.CLEAR_FIELDS:
            return state.set('restaurantName','')
                .set('restaurantLocation','')
                .set('bathroomRate',1)
                .set('staffRate',1)
                .set('cleanRate',1)
                .set('foodRate',1)
                .set('driveInRate',0)
                .set('deliveryRate',0)
                .set('freeText','')
                .set('picture',{pictureType: '', pictureData: []});
                // .set('submitMessage', {succeed: false, message: ''});

        case AddReviewActionsConstants.ADD_REVIEW_FAILURE:
            return state.set('showRestaurantForm', false)
                .set('submitMessage', {succeed: false, message: action.payload.message});

        case AddReviewActionsConstants.MISSING_REVIEW_FIELDS:
            return state.set('submitMessage', {succeed: false, message: action.payload.message});

        case AddReviewActionsConstants.INIT_REVIEW_MESSAGE:
            return state.set('submitMessage', {succeed: false, message: ''});

        default: //otherwise state is lost!
            return state;
    }
};
export default AddReviewReducer