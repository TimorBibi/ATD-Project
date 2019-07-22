import { RestaurantsActionsConstants} from './constants'
import initialState from '../../initialState'

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

        case RestaurantsActionsConstants.SUGGEST_LOCATION:
            return state.set('suggestions', action.payload.suggestedLocations)
                .set('submitMessage', {succeed: false, message: ''});

        case RestaurantsActionsConstants.SUBMIT_RESTAURANT_SUCCEED:
            return state.set('showRestaurantForm', false)
                .set('submitMessage', {succeed: true, message: "Restaurant submitted."});

        case RestaurantsActionsConstants.SUBMIT_RESTAURANT_FAILURE:
            return state.set('showRestaurantForm', false)
                .set('submitMessage', {succeed: false, message: action.payload.message});

        case RestaurantsActionsConstants.MISSING_FIELD:
            return state.set('submitMessage', {succeed: false, message: "Please fill in the required fields."})

        default: //otherwise state is lost!
            return state;
    }
};
export default RestaurantsReducer