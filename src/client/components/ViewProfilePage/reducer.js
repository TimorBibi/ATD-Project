import { ViewProfilePageActionsConstants} from './constants'
import initialState from '../../initialState'
import {RestaurantsActionsConstants} from "../Restaurants/constants";
import {Map} from "immutable";
import {RegisterPageActionsConstants} from "../RegisterPage/constants";

const ViewProfilePageReducer = (state = initialState.viewProfilePage, action) => {
    console.log('ViewProfilePage state=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case ViewProfilePageActionsConstants.TOGGLE_FORM:
            return state.set('showRestaurantForm', action.payload.newVal)
                .set('submitMessage', {succeed: false, message: ''});

        case ViewProfilePageActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value)
                .set('submitMessage', {succeed: false, message: ''});

        case ViewProfilePageActionsConstants.VIEW_REVIEWS:
            return state.set('showReviews', new Map({
                selectedRest: action.payload.selectedRest,
                visible: action.payload.visible,
            }));

        case ViewProfilePageActionsConstants.EDIT_REVIEW:
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

        case ViewProfilePageActionsConstants.EDIT_PROFILE:
            return state.set('editProfile', !action.payload.prevValue);

        case ViewProfilePageActionsConstants.VALIDATE_ACTION_SUCCESS:
            return state.set('isValidUsername', true)
                .set('submitMessage', {succeed: false, message: ''});

        case ViewProfilePageActionsConstants.VALIDATE_ACTION_FAILURE:
            return state.set('isValidUsername', false)
                .set('submitMessage', {succeed: false, message: action.payload.message});

        case ViewProfilePageActionsConstants.SUGGEST_LOCATION:
            return state.set('suggestions', action.payload.suggestedLocations)
                .set('submitMessage', {succeed: false, message: ''});

        case ViewProfilePageActionsConstants.REGISTER_FAILURE:
            return state.set('submitMessage', {succeed: false, message: ''});

        case ViewProfilePageActionsConstants.SUBMIT_USER_SUCCESS:
            return state.set('submitMessage', {succeed: true, message: action.payload.message});

        case ViewProfilePageActionsConstants.MISSING_FIELDS:
            return state.set('submitMessage', {succeed: false, message: action.payload.message});

        default: //otherwise state is lost!
            return state;
    }
};
export default ViewProfilePageReducer