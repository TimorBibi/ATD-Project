import { UsersActionsConstants } from './constants';
import {AppActionsConstants} from "../App/constants";
import {LogInPageActionsConstants} from "../LogInPage/constants";


function updateStateFieldAction(field, value) {
    return {
        type: UsersActionsConstants.UPDATE_STATE_FIELD,
        payload: {
            field,
            value,
        }
    };
}

function showUserReviewsAction(prevReviewValue, currId){
    const prev = prevReviewValue.get('selectedUser');
    const payload = (prev === currId)?
        {selectedUser: currId, visible: !prevReviewValue.get('visible')}:
        {selectedUser: currId, visible: true};
    return {
        type: UsersActionsConstants.VIEW_REVIEWS,
        payload: payload
    }
}

function moveToUserProfileAction(){
    return {
        type: UsersActionsConstants.MOVE_TO_MY_PROFILE
    }
}

function movedFromUsersPage() {
    return {
        type: UsersActionsConstants.MOVE_FROM_USERS
    }
}

function initShowUsersAction(users)
{
    console.log("$$$$$$$", users);
    return {
        type: UsersActionsConstants.UPDATE_USERS_TO_SHOW,
        payload: {
            users: users
        }
    }
}

function updateShowUsersAction(users)
{
    return {
        type: UsersActionsConstants.UPDATE_USERS_TO_SHOW,
        payload: {
            users: users
        }
    }
}

function updateSearchKeyAction(key)
{
    return {
        type: UsersActionsConstants.UPDATE_SEARCH_KEY,
        payload: {
            key: key
        }
    }
}

function updateSearchValueAction(value)
{
    return {
        type: UsersActionsConstants.UPDATE_SEARCH_VALUE,
        payload: {
            value: value
        }
    }
}


let UsersActions = {
    updateStateFieldAction,
    showUserReviewsAction,
    moveToUserProfileAction,
    movedFromUsersPage,
    initShowUsersAction,
    updateShowUsersAction,
    updateSearchKeyAction,
    updateSearchValueAction,
};

export default UsersActions