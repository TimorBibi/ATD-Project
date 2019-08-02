import {Image} from "semantic-ui-react";
const {Map, List} = require('immutable');
import React from 'react';
import './App.scss';
import TopBar from '../TopBar';
import { connect } from 'react-redux';
import AppActions from './actions';
import RegisterPage from "../RegisterPage/RegisterPage";
import { BrowserRouter as Router, Route, Header } from "react-router-dom";
import LogInPage from '../LogInPage/LogInPage';
import Restaurants from '../Restaurants/Restaurants';
import ViewProfilePage from '../ViewProfilePage/ViewProfilePage';
import Users from '../Users/Users';


class App extends React.Component {

    componentDidMount(){
        this.props.checkTokenEventHandle();
        this.props.loadCitiesEventHandler();
        this.props.loadUsersEventHandler();
        this.props.loadRestaurantsEventHandler();
    }

    componentDidUpdate()
    {
        if(this.props.addedUser)
        {
            this.props.loadUsersEventHandler();
        }
        if(this.props.addedReview)
        {
            this.props.loadRestaurantsEventHandler();
            this.props.loadUsersEventHandler();
        }
    }

  render() {

      return (
            <Router>
                <div className="app-root">
                    <TopBar/>
                    <div className="app-header">
                            {/*<h2 id="name">*/}
                            {/*    Restaurateur*/}
                            {/*</h2>*/}
                    </div>
                    <div className="app-body">
                        <Route exact path="/" component={Restaurants} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/login" component={LogInPage} />
                        <Route path="/viewProfile" component={ViewProfilePage} />
                        <Route path="/users" component={Users} />
                    </div>
                </div>
            </Router>
        );
    }
}


const mapStateToProps = (state) => {
  return {
      isConnected: state['app'].get('isConnected'),
      username: state['app'].get('username'),
      locations: state['app'].get('locations'),
      users: (List) (state['app'].get('users')).toArray(),
      restaurantsToShow: (List) (state['restaurants'].get('restaurantsToShow')).toArray(),
      addedUser: state['app'].get('addedUser'),
      addedReview: state['app'].get('addedReview'),
      restaurants: (List) (state['app'].get('restaurants')).toArray(),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      checkTokenEventHandle: () => {
          dispatch(AppActions.checkTokenAction());
      },
      loadCitiesEventHandler: () => {
          dispatch(AppActions.loadCitiesAction());
      },
      loadUsersEventHandler: () => {
          dispatch(AppActions.loadUsersAction());
      },
      loadRestaurantsEventHandler: () => {
          dispatch(AppActions.loadRestaurantsAction());
      },}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
