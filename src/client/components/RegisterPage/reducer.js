import { RegisterPageActionsConstants } from './constants'
import initialState from '../../initialState'

const RegisterPageReducer = (state = initialState.registerPage, action) => {
    console.log('RegisterPage state=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case RegisterPageActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value);

        case RegisterPageActionsConstants.VALIDATE_ACTION_SUCCESS:
            return state.set('isValidUsername', action.payload.isValid);

        case RegisterPageActionsConstants.SUGGEST_LOCATION:
            return state.set('suggestions', action.payload.suggestedLocations);

        case RegisterPageActionsConstants.REGISTER_FAILURE:
            return state;

        case RegisterPageActionsConstants.VALIDATE_LOCATION:
            return state.set('isValidLocation', action.payload.succeed)
                .set('locationMessage', action.payload.message);

        default: //otherwise state is lost!
            return state;
    }
};
export default RegisterPageReducer
// let pictureData = fs.readAsDataURL(file);