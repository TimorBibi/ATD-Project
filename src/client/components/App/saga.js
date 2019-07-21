import {AppActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import AppActions from './actions'

function* checkToken(action){
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(AppActions.connectUserAction(json));
    } catch (e) {
        yield put(AppActions.appFailureAction(e.message));
    }
}

function* disconnectUser(action) {
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(AppActions.connectUserAction(false));
    } catch (e) {
        yield put(AppActions.appFailureAction(e.message));
    }
}

function* AppSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AppActionsConstants.CHECK_TOKEN, checkToken);
    yield takeEvery(AppActionsConstants.DISCONNECT_USER, disconnectUser)
}

export default AppSaga;
