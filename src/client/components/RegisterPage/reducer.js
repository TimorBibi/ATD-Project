import { RegisterPageActionsConstants } from './constants'
import initialState from '../../initialState'

const RegisterPageReducer = (state = initialState.registerPage, action) => {
    console.log('RegisterPage state=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case RegisterPageActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value);

        case RegisterPageActionsConstants.VALIDATE_REGISTER_ACTION_SUCCESS:
            return state.set('isValid', true);

        case RegisterPageActionsConstants.VALIDATE_REGISTER_ACTION_FAILURE:
            return state.set('isValid', false)
        .set('submitMessage', {succeed: false, message: action.payload.message});

        case RegisterPageActionsConstants.SUGGEST_LOCATION:
            return state.set('suggestions', action.payload.suggestedLocations);
                // .set('submitMessage', {succeed: false, message: ''});

        case RegisterPageActionsConstants.REGISTER_FAILURE:
            return state.set('submitMessage', {succeed: false, message: ''});

        case RegisterPageActionsConstants.MISSING_REGISTER_FIELDS:
            return state.set('submitMessage', {succeed: false, message: action.payload.message});

        case RegisterPageActionsConstants.INIT_REGISTER_MESSAGE:
            return state.set('submitMessage', {succeed: false, message: ''});
        default: //otherwise state is lost!
            return state;
    }
};
export default RegisterPageReducer