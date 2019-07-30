import { UsersActionsConstants } from './constants';
import {AppActionsConstants} from "../App/constants";
import {LogInPageActionsConstants} from "../LogInPage/constants";
import {RegisterPageActionsConstants} from "../RegisterPage/constants";
import {ViewProfilePageActionsConstants} from "../ViewProfilePage/constants";


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

function updateSearchKeyAction(key, locations, users, restaurants)
{
    return {
        type: UsersActionsConstants.UPDATE_SEARCH_KEY,
        payload: {
            key: key,
            locations: locations,
            users: users,
            restaurants: restaurants
        }
    }
}

function updateSearchValueAction(value)
{
    return {
        type: UsersActionsConstants.UPDATE_USER_SEARCH_VALUE,
        payload: {
            value: value
        }
    }
}


function suggestInUsersAction(fullList, subString){
    const suggested =
        fullList.filter(elm => {
            return elm.toLowerCase().startsWith(subString.toLowerCase());
        });
    return {
        type: UsersActionsConstants.SUGGEST_IN_USERS,
        payload: {
            suggested: suggested
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
    suggestInUsersAction
};

export default UsersActions