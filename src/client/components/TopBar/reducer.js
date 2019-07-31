import { TopBarActionsConstants } from './constants'
import initialState from '../../initialState'

const TopBarReducer = (state = initialState.topbar, action) => {
    console.log('TopBarState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){

        case TopBarActionsConstants.SET_ACTIVE:
            return state.set('activeItem', action.payload.activeItem);

        default: //otherwise state is lost!
            return state;
    }
};
export default TopBarReducer