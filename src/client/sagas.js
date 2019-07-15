import { all } from 'redux-saga/effects'
import GallerySaga from './components/Gallery/saga'
import AppSaga from './components/App/saga'
import ReviewFormSaga from "./components/ReviewForm/saga";

export default function* Sagas() {
    yield all([
        AppSaga(),
        GallerySaga(),
        ReviewFormSaga()
    ])
}
