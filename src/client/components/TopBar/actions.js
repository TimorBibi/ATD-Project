import { TopBarActionsConstants } from './constants';

function setActiveAction(name) {
    const item = name === "logout" ? 'restaurants': name;
    return {
        type: TopBarActionsConstants.SET_ACTIVE,
        payload: {
            activeItem: item
        }
    };
}

let ReviewFormActions = {
    setActiveAction,
};

export default ReviewFormActions