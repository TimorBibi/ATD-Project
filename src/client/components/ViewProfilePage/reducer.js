import { ViewProfilePageActionsConstants} from './constants'
import initialState from '../../initialState'
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

        case ViewProfilePageActionsConstants.SHOW_EDIT_PROFILE:
            return state.set('editProfile', !action.payload.prevValue);

        case ViewProfilePageActionsConstants.EDIT_PROFILE:
            return state.set('editProfile', !action.payload.prevValue)
                .set('profileUsername', action.payload.user.get('username'))
                .set('profileLocation', Map(action.payload.user.get('location')).get('city'))
                .set('profilePicture', action.payload.user.get('picture'));

        case ViewProfilePageActionsConstants.UPDATE_PASSWORD:
            return state.set('profilePassword', action.payload.password);


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

        case ViewProfilePageActionsConstants.INIT_VIEW_PROFILE_MESSAGE:
            return state.set('submitMessage', {succeed: false, message: ''});

        default: //otherwise state is lost!
            return state;
    }
};
export default ViewProfilePageReducer