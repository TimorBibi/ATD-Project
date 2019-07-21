import { TopBarActionsConstants } from './constants';

function setActiveAction(curr, name) {
    if (curr !== name) {
        return {
            type: TopBarActionsConstants.SET_ACTIVE,
            payload: {
                name
            }
        };
    }
    else
        return {type: TopBarActionsConstants.NONE}
}


let ReviewFormActions = {
    setActiveAction,
};

export default ReviewFormActions