import { LogInPageActionsConstants} from './constants'
import initialState from '../../initialState'

const LogInPageReducer = (state = initialState.loginPage, action) => {
    console.log('LogInPage state=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case LogInPageActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value);

        case LogInPageActionsConstants.MISSING_FIELD:
            return state.set('errorMessage', action.payload.message);

        case LogInPageActionsConstants.FALSE_VALIDATE_USER:
            return state.set('errorMessage', action.payload.message);

        case LogInPageActionsConstants.INIT_ERROR_MESSAGE:
            return state.set('errorMessage', '');

        default: //otherwise state is lost!
            return state;
    }
};
export default LogInPageReducer