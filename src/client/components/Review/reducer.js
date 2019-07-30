import { ReviewActionsConstants} from './constants'
import initialState from '../../initialState'

const ReviewReducer = (state = initialState.review, action) => {
    console.log('Restaurants state=', state);
    console.log('RECEIVED ACTION:', action);

    switch (action.type){

        default: //otherwise state is lost!
            return state;
    }
};
export default ReviewReducer