import {ReviewActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import ReviewActions from './actions'
import AppActions from '../App/actions'
import RestaurantsActions from "../Restaurants/actions";

function* submitEditReview(action){
    console.log('ReviewSaga=', action);
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
        yield put(AppActions.submitEditReviewSucceedAction(json));
        yield put(RestaurantsActions.updateShowReviews());
    } catch (e) {
        console.log("Review saga: ", e.message);
    }
}

function* deleteReview(action){
    console.log('ReviewSaga=', action);
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
        yield put(AppActions.updateReviewAfterSubmit());
    } catch (e) {
        console.log("Review saga: ", e.message);
    }
}


function* ReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ReviewActionsConstants.SUBMIT_EDIT_REVIEW, submitEditReview);
    yield takeEvery(ReviewActionsConstants.DELETE_REVIEW, deleteReview);

}

export default ReviewSaga;