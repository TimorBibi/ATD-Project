import { TopBarActionsConstants } from './constants';

function setActiveAction(name) {
    return {
        type: TopBarActionsConstants.SET_ACTIVE,
        payload: {
            name
        }
    }
}


let ReviewFormActions = {
    setActiveAction,
    // loadRestsAction,

};

export default ReviewFormActions