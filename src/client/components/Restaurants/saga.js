import {RestaurantsActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import RestaurantsActions from './actions'

function* submitRestaurant(action){
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
        yield put(RestaurantsActions.submitRestaurantSucceedAction(json));
    } catch (e) {
        yield put(RestaurantsActions.restaurantFailureAction(e.message));
    }
}


function* RestaurantsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RestaurantsActionsConstants.SUBMIT_RESTAURANT, submitRestaurant);

}

export default RestaurantsSaga;