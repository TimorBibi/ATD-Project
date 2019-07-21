import { AddReviewActionsConstants } from './constants'
import initialState from '../../initialState'

const AddReviewReducer = (state = initialState.addReview, action) => {
    console.log('AddReviewReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case AddReviewActionsConstants.UPDATE_NAME:
            return state.set('name', action.payload.name);
        case AddReviewActionsConstants.ADD_REVIEW_ACTION_SUCCESS:
            let res = action.payload.name;
            console.log("Reducer here");
            return state.set('name', "answer: " + res.name);
        default: //otherwise state is lost!
            return state;
    }
};
export default AddReviewReducer