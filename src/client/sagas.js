import { all } from 'redux-saga/effects'
import GallerySaga from './components/Gallery/saga'
import AppSaga from './components/App/saga'
import ReviewFormSaga from "./components/ReviewForm/saga";
import RegisterPageSaga from "./components/RegisterPage/saga"

export default function* Sagas() {
    yield all([
        AppSaga(),
        GallerySaga(),
        ReviewFormSaga(),
        RegisterPageSaga(),
    ])
}
