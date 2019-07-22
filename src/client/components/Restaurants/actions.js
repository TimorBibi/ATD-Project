import { RestaurantsActionsConstants } from './constants';

function toggleRestaurantForm(currVal) {
    let newVal = !currVal;
    return {
        type: RestaurantsActionsConstants.TOGGLE_FORM,
        payload: {
            newVal: newVal
        }
    };
}

function updateStateFieldAction(field, value) {
    return {
        type: RestaurantsActionsConstants.UPDATE_STATE_FIELD,
        payload: {
            field,
            value,
        }
    }
}

function suggestLocationsAction(fullList, subString){
    const suggestedLocations =
        fullList.filter(elm => {
            return elm.toLowerCase().startsWith(subString.toLowerCase());
        });
    return {
        type: RestaurantsActionsConstants.SUGGEST_LOCATION,
        payload: {
            suggestedLocations: suggestedLocations
        }
    }
}

function submitRestaurantAction(name, location){
    if(name && location)
        return {
            type: RestaurantsActionsConstants.SUBMIT_RESTAURANT,
            uri: '/api/submit/restaurant',
            payload: {
                name: name,
                location: location,
            }
        };
    else
        return {
            type: RestaurantsActionsConstants.MISSING_FIELD,
            payload: {
                name: name,
                location: location,
            }
        };
}

function submitRestaurantSucceedAction({succeed, message}){
    if (!succeed)
        return {
            type: RestaurantsActionsConstants.SUBMIT_RESTAURANT_FAILURE,
            payload: {
                message: message,
            }
        }
    else
        return {type: RestaurantsActionsConstants.SUBMIT_RESTAURANT_SUCCEED,};
}

function restaurantFailureAction(error){
        return {
            type: RestaurantsActionsConstants.RESTAURANTS_FAILURE,
            payload: {
                error: error
            }
        };
}

let RestaurantsActions = {
    toggleRestaurantForm,
    updateStateFieldAction,
    suggestLocationsAction,
    submitRestaurantAction,
    submitRestaurantSucceedAction,
    restaurantFailureAction,
};

export default RestaurantsActions