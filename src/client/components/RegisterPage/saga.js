import {RegisterPageActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import RegisterPageActions from './actions'
import AppActions from '../App/actions'

function* validateUsername(action){
    console.log('RegisterPageSaga=', action);
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
        yield put(RegisterPageActions.validateActionSuccess(json.isValid));
    } catch (e) {
        yield put(RegisterPageActions.RegisterPageFailureAction(e.message));
    }
}

function* submitUser(action){
    console.log('RegisterPageSaga=', action);
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
    } catch (e) {
        yield put(RegisterPageActions.RegisterPageFailureAction(e.message));
    }
}

function* RegisterPageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RegisterPageActionsConstants.VALIDATE_USERNAME, validateUsername);
    yield takeEvery(RegisterPageActionsConstants.SUBMIT_USER, submitUser);
}

export default RegisterPageSaga;