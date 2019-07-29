import {RestaurantsActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import RestaurantsActions from './actions'
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
        yield put(AppActions.submitEditReviewSucceedAction(json));
        yield put(RestaurantsActions.updateShowReviews());
    } catch (e) {
        yield put(RestaurantsActions.editReviewFailureAction(e.message));
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
        yield put(RestaurantsActions.deleteReviewSucceedAction(json));
    } catch (e) {
        yield put(RestaurantsActions.deleteReviewFailureAction(e.message));
    }
}


function* RestaurantsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RestaurantsActionsConstants.SUBMIT_EDIT_REVIEW, submitEditReview);
    yield takeEvery(RestaurantsActionsConstants.DELETE_REVIEW, deleteReview);

}

export default RestaurantsSaga;