import { all } from 'redux-saga/effects';
import AppSaga from './components/App/saga';
import RegisterPageSaga from "./components/RegisterPage/saga";
import LogInPageSaga from "./components/LogInPage/saga";
import ViewProfilePageSaga from './components/ViewProfilePage/saga';
import RestaurantsSaga from './components/Restaurants/saga';
import AddReviewSaga from './components/AddReview/saga';
import UsersSaga from "./components/Users/saga";

export default function* Sagas() {
    yield all([
        AppSaga(),
        RegisterPageSaga(),
        LogInPageSaga(),
        ViewProfilePageSaga(),
        RestaurantsSaga(),
        AddReviewSaga(),
        UsersSaga()
    ])
}
