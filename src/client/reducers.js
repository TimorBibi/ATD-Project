import { combineReducers } from 'redux';
import GalleryReducer from './components/Gallery/reducer';
import ReviewFormReducer from './components/ReviewForm/reducer';
import AppReducer from './components/App/reducer';

export default combineReducers({
  app: AppReducer,
  gallery: GalleryReducer,
  reviewform: ReviewFormReducer
});
