import { all } from 'redux-saga/effects'
import GallerySaga from './components/Gallery/saga'
import AppSaga from './components/App/saga'
import ReviewFormSaga from "./components/ReviewForm/saga";
import RegisterPageSaga from "./components/RegisterPage/saga"
import LogInPageSaga from "./components/LogInPage/saga"

export default function* Sagas() {
    yield all([
        AppSaga(),
        GallerySaga(),
        ReviewFormSaga(),
        RegisterPageSaga(),
        LogInPageSaga(),
    ])
}
