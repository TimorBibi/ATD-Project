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

function* submitUser(action) {
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
        yield put(AppActions.connectUserAction(json));
        yield put(AppActions.updateUserAfterSubmit());
        yield put(ViewProfilePageActions.submitUserSuccessAction(json))
    } catch (e) {
        yield put(ViewProfilePageActions.RegisterPageFailureAction(e.message));
    }
}

function* ViewProfilePageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ViewProfilePageActionsConstants.SUBMIT_EDIT_REVIEW, submitEditReview);
    yield takeEvery(ViewProfilePageActionsConstants.DELETE_REVIEW, deleteReview);
    yield takeEvery(ViewProfilePageActionsConstants.VALIDATE_USERNAME, validateUsername);
    yield takeEvery(ViewProfilePageActionsConstants.SUBMIT_USER, submitUser);}

export default ViewProfilePageSaga;