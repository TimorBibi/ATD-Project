import {ViewProfilePageActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import ViewProfilePageActions from './actions'
import AppActions from '../App/actions'
import RegisterPageActions from "../RegisterPage/actions";
import {RegisterPageActionsConstants} from "../RegisterPage/constants";

function* submitEditReview(action){
    console.log('ViewProfilePageSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(ViewProfilePageActions.submitEditReviewSucceedAction(json));
        yield put(AppActions.updateReviewAfterSubmit());
    } catch (e) {
        yield put(ViewProfilePageActions.editReviewFailureAction(e.message));
    }
}

function* deleteReview(action){
    console.log('ViewProfilePageSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(ViewProfilePageActions.deleteReviewSucceedAction(json));
        yield put(AppActions.updateReviewAfterSubmit());
    } catch (e) {
        yield put(ViewProfilePageActions.deleteReviewFailureAction(e.message));
    }
}

function* validateUsername(action){
    console.log('ViewProfilePageSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(ViewProfilePageActions.validateActionSuccess(json.isValid));
    } catch (e) {
        yield put(ViewProfilePageActions.RegisterPageFailureAction(e.message));
    }
}


function* getPassword(action) {
    console.log('ViewProfilePageSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']);
        yield put(ViewProfilePageActions.getPasswordSuccessAction(json))
    } catch (e) {
        console.log("get password failed");
    }
}

function* ViewProfilePageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ViewProfilePageActionsConstants.VALIDATE_USERNAME, validateUsername);
    yield takeEvery(ViewProfilePageActionsConstants.EDIT_PROFILE, getPassword);}

export default ViewProfilePageSaga;