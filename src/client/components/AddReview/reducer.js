import { AddReviewActionsConstants } from './constants'
import initialState from '../../initialState'

const AddReviewReducer = (state = initialState.addReview, action) => {
    console.log('AddReviewReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case AddReviewActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value)
                .set('submitMessage', {succeed: false, message: ''});

        case AddReviewActionsConstants.SUGGEST_LOCATION:
            return state.set('suggestions', action.payload.suggestedLocations)
                .set('submitMessage', {succeed: false, message: ''});

        case AddReviewActionsConstants.SUBMIT_REVIEW_SUCCEED:
            return state.set('showRestaurantForm', false)
                .set('submitMessage', {succeed: true, message: "Restaurant submitted."});

        case AddReviewActionsConstants.ADD_REVIEW_FAILURE:
            return state.set('showRestaurantForm', false)
                .set('submitMessage', {succeed: false, message: action.payload.message});

        case AddReviewActionsConstants.MISSING_FIELD:
            return state.set('submitMessage', {succeed: false, message: "Please fill in the required fields."})

        default: //otherwise state is lost!
            return state;
    }
};
export default AddReviewReducer