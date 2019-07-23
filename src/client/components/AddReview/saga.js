import {AddReviewActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import AddReviewActions from './actions'
import AppActions from '../App/actions'

function* submitReview(action){
    console.log('AddReviewSaga=', action);
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
        yield put(AddReviewActions.submitReviewSucceedAction(json));
        yield put(AppActions.updateReviewAfterSubmit());
    } catch (e) {
        yield put(AddReviewActions.reviewFailureAction(e.message));
    }
}

function* AddReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AddReviewActionsConstants.SUBMIT_REVIEW, submitReview);
}

export default AddReviewSaga;
