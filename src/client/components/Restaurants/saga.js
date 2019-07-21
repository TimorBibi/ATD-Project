import {RestaurantsActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import RestaurantsActions from './actions'
import AppActions from '../App/actions'



function* RestaurantsSaga() {
    //using takeEvery, you take the action away from reducer to saga
}

export default RestaurantsSaga;