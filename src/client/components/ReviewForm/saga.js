import {ReviewFormActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import ReviewFormActions from './actions'

function* loadNames(action){
    console.log('ReviewFormSaga=', action);
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
        yield put(ReviewFormActions.addReviewSuccessAction(json));
    } catch (e) {
        yield put(ReviewFormActions.addReviewFailureAction(e.message));
    }
}

function* ReviewFormSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ReviewFormActionsConstants.ADD_REVIEW, loadNames);
}

export default ReviewFormSaga;
