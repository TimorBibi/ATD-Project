import { TopBarActionsConstants } from './constants'
import initialState from '../../initialState'

const TopBarReducer = (state = initialState.topbar, action) => {
    console.log('TopBarState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){

        default: //otherwise state is lost!
            return state;
    }
};
export default TopBarReducer