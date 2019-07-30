import {ViewProfilePageActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import ViewProfilePageActions from './actions'
import AppActions from "../App/actions";


function* validateEditUsername(action){
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
        yield put(ViewProfilePageActions.validateEditActionSuccess(json.isValid));
    } catch (e) {
        yield put(ViewProfilePageActions.validateEditActionFailure(e.message));
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

function* submitEditUser(action){
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
        yield put(AppActions.updateUserAfterSubmit());
        yield put(ViewProfilePageActions.submitEditUserSuccessAction(json))
    } catch (e) {
        yield put(ViewProfilePageActions.submitEditUserFailureAction(e.message));
    }
}

function* ViewProfilePageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ViewProfilePageActionsConstants.VALIDATE_EDIT_USERNAME, validateEditUsername);
    yield takeEvery(ViewProfilePageActionsConstants.EDIT_PROFILE, getPassword);
    yield takeEvery(ViewProfilePageActionsConstants.SUBMIT_EDIT_USER, submitEditUser);}


export default ViewProfilePageSaga;