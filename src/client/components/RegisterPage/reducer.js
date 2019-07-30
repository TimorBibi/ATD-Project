import { RegisterPageActionsConstants } from './constants'
import initialState from '../../initialState'

const RegisterPageReducer = (state = initialState.registerPage, action) => {
    console.log('RegisterPage state=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case RegisterPageActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value)
                .set('submitMessage', {succeed: false, message: ''});

        case RegisterPageActionsConstants.VALIDATE_ACTION_SUCCESS:
            return state.set('isValidUsername', true)
                .set('submitMessage', {succeed: false, message: ''});

        case RegisterPageActionsConstants.VALIDATE_ACTION_FAILURE:
            return state.set('isValidUsername', false)
                .set('submitMessage', {succeed: false, message: action.payload.message});

        case RegisterPageActionsConstants.SUGGEST_LOCATION:
            return state.set('suggestions', action.payload.suggestedLocations)
                .set('submitMessage', {succeed: false, message: ''});

        case RegisterPageActionsConstants.REGISTER_FAILURE:
            return state.set('submitMessage', {succeed: false, message: ''});

        case RegisterPageActionsConstants.MISSING_FIELDS:
            return state.set('submitMessage', {succeed: false, message: action.payload.message});

        default: //otherwise state is lost!
            return state;
    }
};
export default RegisterPageReducer