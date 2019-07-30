import {ViewProfilePageActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import ViewProfilePageActions from './actions'


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