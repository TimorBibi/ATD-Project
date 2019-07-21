import { LogInPageActionsConstants} from './constants'
import initialState from '../../initialState'

const LogInPageReducer = (state = initialState.loginPage, action) => {
    console.log('LogInPage state=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case LogInPageActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value);

        case LogInPageActionsConstants.MISSING_USERNAME:
            return state.set('usernameError', action.message)
                .set('passwordError', '');

        case LogInPageActionsConstants.MISSING_PASSWORD:
            return state.set('passwordError', action.message)
                .set('usernameError', '');

        case LogInPageActionsConstants.FALSE_VALIDATE_USER:
            if (action.payload.reason === 'username')
                return state.set('usernameError', action.payload.message);
            else
                return state.set('passwordError', action.payload.message);

        default: //otherwise state is lost!
            return state;
    }
};
export default LogInPageReducer