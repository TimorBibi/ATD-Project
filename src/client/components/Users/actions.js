import { UsersActionsConstants } from './constants';

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


let UsersActions = {
    showUserReviewsAction,
    moveToUserProfileAction,
    movedFromUsersPage,
};

export default UsersActions