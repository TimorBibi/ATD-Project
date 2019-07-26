import { combineReducers } from 'redux';
import AppReducer from './components/App/reducer';
import TopBarReducer from './components/TopBar/reducer';
import RegisterPage from './components/RegisterPage/reducer';
import LogInPageReducer from "./components/LogInPage/reducer";
import RestaurantsReducer from './components/Restaurants/reducer';
import AddReviewReducer from './components/AddReview/reducer';
import UsersReducer from "./components/Users/reducer";

export default combineReducers({
  app: AppReducer,
  topbar: TopBarReducer,
  registerPage: RegisterPage,
  loginPage: LogInPageReducer,
  // viewProfilePge: ViewProfilePageReducer,
  restaurants: RestaurantsReducer,
  addReview: AddReviewReducer,
  users: UsersReducer
});
