import { RestaurantsActionsConstants} from './constants'
import initialState from '../../initialState'

const RestaurantsReducer = (state = initialState.restaurants, action) => {
    console.log('Restaurants state=', state);
    console.log('RECEIVED ACTION:', action);

    switch (action.type){
        case RestaurantsActionsConstants.TOGGLE_FORM:
            return state.set('showRestaurantForm', action.payload.newVal);

        case RestaurantsActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value);

        case RestaurantsActionsConstants.SUGGEST_LOCATION:
            return state.set('suggestions', action.payload.suggestedLocations);

        default: //otherwise state is lost!
            return state;
    }
};
export default RestaurantsReducer