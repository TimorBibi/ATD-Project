import { ViewProfilePageActionsConstants} from './constants'
import initialState from '../../initialState'
import {RestaurantsActionsConstants} from "../Restaurants/constants";
import {Map} from "immutable";

const ViewProfilePageReducer = (state = initialState.viewProfilePage, action) => {
    console.log('ViewProfilePage state=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case ViewProfilePageActionsConstants.TOGGLE_FORM:
            return state.set('showRestaurantForm', action.payload.newVal)
                .set('submitMessage', {succeed: false, message: ''});
        case RestaurantsActionsConstants.UPDATE_REST_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value)
                .set('submitMessage', {succeed: false, message: ''});

        case RestaurantsActionsConstants.VIEW_REVIEWS:
            return state.set('showReviews', new Map({
                selectedRest: action.payload.selectedRest,
                visible: action.payload.visible,
            }));

        case RestaurantsActionsConstants.EDIT_REVIEW:
            return state.set('editReview', new Map({
                selectedReview: action.payload.editReview.selectedReview,
                edit: action.payload.editReview.edit,
            })).set('avgRate', action.payload.avgRate)
                .set('bathroomRate', action.payload.bathroom)
                .set('staffRate', action.payload.staff)
                .set('cleanRate', action.payload.clean)
                .set('foodRate', action.payload.food)
                .set('driveInRate', action.payload.driveIn)
                .set('deliveryRate', action.payload.delivery)
                .set('freeText', action.payload.freeText)
                .set('picture', action.payload.picture);

        default: //otherwise state is lost!
            return state;
    }
};
export default ViewProfilePageReducer