import {ViewProfilePageActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import ViewProfilePageActions from './actions'
import AppActions from '../App/actions'

function* submitEditReview(action){
    console.log('RestaurantsSaga=', action);
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
    console.log('RestaurantsSaga=', action);
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

function* ViewProfilePageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ViewProfilePageActionsConstants.SUBMIT_EDIT_REVIEW, submitEditReview);
    yield takeEvery(ViewProfilePageActionsConstants.DELETE_REVIEW, deleteReview);}

export default ViewProfilePageSaga;