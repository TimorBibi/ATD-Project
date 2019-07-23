import {AppActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import AppActions from './actions'
import RegisterPageActions from "../RegisterPage/actions";

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
        yield put(AppActions.connectUserAction({succeed: false, username: ''}));
    } catch (e) {
        yield put(AppActions.appFailureAction(e.message));
    }
}

function* loadCities(action){
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
        yield put(AppActions.loadCitiesSuccessAction(json));

    } catch (e) {
        yield put(AppActions.appFailureAction(e.message));
    }
}

function* loadUsers(action){
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
        yield put(AppActions.loadUsersSuccessAction(json));

    } catch (e) {
        yield put(AppActions.appFailureAction(e.message));
    }
}

function* loadRestaurants(action){
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
        yield put(AppActions.loadRestaurantsSuccessAction(json));

    } catch (e) {
        yield put(AppActions.appFailureAction(e.message));
    }
}

function* AppSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AppActionsConstants.CHECK_TOKEN, checkToken);
    yield takeEvery(AppActionsConstants.DISCONNECT_USER, disconnectUser);
    yield takeEvery(AppActionsConstants.LOAD_CITIES, loadCities);
    yield takeEvery(AppActionsConstants.LOAD_USERS, loadUsers);
    yield takeEvery(AppActionsConstants.LOAD_RESTAURANTS, loadRestaurants);
}

export default AppSaga;
