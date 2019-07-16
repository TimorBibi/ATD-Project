import { ReviewFormActionsConstants } from './constants'
import initialState from '../../initialState'

const ReviewFormReducer = (state = initialState.reviewform, action) => {
    console.log('ReviewFormReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case ReviewFormActionsConstants.UPDATE_NAME:
            return state.set('name', action.payload.name);
        case ReviewFormActionsConstants.ADD_REVIEW_ACTION_SUCCESS:
            let res = action.payload.name;
            console.log("Reducer here");
            return state.set('name', "answer: " + res.name);
        default: //otherwise state is lost!
            return state;
    }
};
export default ReviewFormReducer