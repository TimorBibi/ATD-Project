import { combineReducers } from 'redux';
import GalleryReducer from './components/Gallery/reducer';
import ReviewFormReducer from './components/ReviewForm/reducer';
import AppReducer from './components/App/reducer';
import TopBarReducer from './components/TopBar/reducer';
import RegisterPage from './components/RegisterPage/reducer'
import LogInPageReducer from "./components/LogInPage/reducer";

export default combineReducers({
  app: AppReducer,
  gallery: GalleryReducer,
  reviewform: ReviewFormReducer,
  topbar: TopBarReducer,
  registerPage: RegisterPage,
  loginPage: LogInPageReducer,
});
