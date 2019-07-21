import { RegisterPageActionsConstants } from './constants'
import initialState from '../../initialState'

const RegisterPageReducer = (state = initialState.registerPage, action) => {
    console.log('RegisterPage state=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case RegisterPageActionsConstants.LOAD_CITIES_SUCCESS:
            const locations = action.payload.cities.map((elm) => {
                return elm.city;
            })
            return state.set('locations', locations);
        case RegisterPageActionsConstants.UPDATE_STATE_FIELD:
            return state.set(action.payload.field, action.payload.value);
        case RegisterPageActionsConstants.VALIDATE_ACTION_SUCCESS:
            return state.set('isValidUsername', action.payload.isValid);
        case RegisterPageActionsConstants.SUGGEST_LOCATION:
            const suggestedLocations =
                action.payload.fullList.filter(elm => {
                return elm.toLowerCase().startsWith(action.payload.subString.toLowerCase());
            })
            return state.set('suggestions', suggestedLocations);
        case RegisterPageActionsConstants.REGISTER_FAILURE:
            return state;

        default: //otherwise state is lost!
            return state;
    }
};
export default RegisterPageReducer
// let pictureData = fs.readAsDataURL(file);