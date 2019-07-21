import { all } from 'redux-saga/effects';
import AppSaga from './components/App/saga';
import AddReviewSaga from "./components/AddReview/saga";
import RegisterPageSaga from "./components/RegisterPage/saga";
import LogInPageSaga from "./components/LogInPage/saga";
import ViewProfilePageSaga from './components/ViewProfilePage/saga';
import RestaurantsSaga from './components/Restaurants/saga';

export default function* Sagas() {
    yield all([
        AppSaga(),
        AddReviewSaga(),
        RegisterPageSaga(),
        LogInPageSaga(),
        ViewProfilePageSaga(),
        RestaurantsSaga(),
    ])
}
