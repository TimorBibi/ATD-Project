import { combineReducers } from 'redux';
import AddReviewReducer from './components/AddReview/reducer';
import AppReducer from './components/App/reducer';
import TopBarReducer from './components/TopBar/reducer';
import RegisterPage from './components/RegisterPage/reducer'
import LogInPageReducer from "./components/LogInPage/reducer";
import ViewProfilePageReducer from './components/ViewProfilePage/reducer'
import RestaurantsReducer from './components/Restaurants/reducer'

export default combineReducers({
  app: AppReducer,
  // addReview: AddReviewReducer,
  topbar: TopBarReducer,
  registerPage: RegisterPage,
  loginPage: LogInPageReducer,
  // viewProfilePge: ViewProfilePageReducer,
  restaurants:   RestaurantsReducer,
});
