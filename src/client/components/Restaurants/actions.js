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

function updateSliderFieldAction(value){
    return {
        type: RestaurantsActionsConstants.UPDATE_SLIDER_FIELD,
        payload: {
            value
        }
    }
}

function showReviewsAction(prevReviewValue, currId, reviews){
    const prev = prevReviewValue.get('selectedRest');
    const payload = (prev === currId)?
        {selectedRest: currId, visible: !prevReviewValue.get('visible'), reviews: reviews}:
        {selectedRest: currId, visible: true, reviews: reviews};
    return {
        type: RestaurantsActionsConstants.VIEW_REVIEWS,
        payload: payload
    }
}



function initShowRestaurantsAction(restaurants)
{
    return {
        type: RestaurantsActionsConstants.UPDATE_RESTAURANTS_TO_SHOW,
        payload: {
            restaurants: restaurants
        }
    }
}

function updateShowRestaurantsAction(restaurants)
{
    return {
        type: RestaurantsActionsConstants.UPDATE_RESTAURANTS_TO_SHOW,
        payload: {
            restaurants: restaurants
        }
    }
}

function updateSearchValueAction()
{
    return {
        type: RestaurantsActionsConstants.UPDATE_REST_SEARCH_VALUE,
    }
}

function updateSearchReviewAction(value)
{
    const seperator = value.indexOf(':');
    const key = value.substring(0, seperator);
    const val = value.substring(seperator+1, value.length);

    return {
        type: RestaurantsActionsConstants.UPDATE_SEARCH_REVIEW,
        payload: {
            key: key,
            value: val
        }
    }
}

function updateShowReviewsAction(reviews)
{
    return {
        type: RestaurantsActionsConstants.UPDATE_REVIEWS_TO_SHOW,
        payload: {
            reviews: reviews
        }
    }
}

function updateReviewSliderFieldAction(value){
    return {
        type: RestaurantsActionsConstants.UPDATE_REVIEW_SLIDER_FIELD,
        payload: {
            value
        }
    }
}

function updateReviewSearchValueAction()
{
    return {
        type: RestaurantsActionsConstants.UPDATE_REVIEW_SEARCH_VALUE,
    }
}


function updateSliderCloserBetterAction(value){
    return {
        type: RestaurantsActionsConstants.UPDATE_CLOSER_BETTER_SLIDER_FIELD,
        payload: {
            value
        }
    }
}

function updateShowReviews(){
    return {
        type: RestaurantsActionsConstants.SHOW_REVIEWS,
    }
}

function suggestionsAction(fullList, subString){
    const suggested =
        fullList.filter(elm => {
            return elm.toLowerCase().startsWith(subString.toLowerCase());
        });
    return {
        type: RestaurantsActionsConstants.SUGGEST_IN_RESTAURANTS,
        payload: {
            suggested: suggested
        }
    }
}


let RestaurantsActions = {
    toggleRestaurantForm,
    updateStateFieldAction,
    showReviewsAction,
    initShowRestaurantsAction,
    updateShowRestaurantsAction,
    updateSearchValueAction,
    updateSliderFieldAction,
    updateSearchReviewAction,
    updateShowReviewsAction,
    updateReviewSliderFieldAction,
    updateReviewSearchValueAction,
    updateSliderCloserBetterAction,
    updateShowReviews,
    suggestionsAction
};

export default RestaurantsActions