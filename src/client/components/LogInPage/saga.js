import {LogInPageActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import LogInPageActions from './actions'
import AppActions from '../App/actions'

function* validateUser(action){
    console.log('LogInPageSaga=', action);
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

        yield put(LogInPageActions.validateUserSuccessAction(json));
        yield put(AppActions.connectUserAction(json));
    } catch (e) {
        yield put(LogInPageActions.LogInPageFailureAction(e.message));
    }
}

function* LogInPageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(LogInPageActionsConstants.VALIDATE_USER, validateUser);
}

export default LogInPageSaga;