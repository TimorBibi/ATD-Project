const {Map, List} = require('immutable');
import React from 'react';
import './App.scss';
import TopBar from '../TopBar';
import { connect } from 'react-redux';
import AppActions from './actions';
import RegisterPage from "../RegisterPage/RegisterPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogInPage from '../LogInPage/LogInPage';
import Restaurants from '../Restaurants/Restaurants';
import ViewProfilePage from '../ViewProfilePage/ViewProfilePage'


class App extends React.Component {

    componentDidMount(){
        this.props.checkTokenEventHandle();
        // if(this.props.locations.length === 0)
        this.props.loadCitiesEventHandler();
        // console.log(this.props.locations);
        this.props.loadUsersEventHandler();
        this.props.loadRestaurantsEventHandler();
    }

    componentDidUpdate()
    {
        if(this.props.addedUser)
        {
            this.props.loadUsersEventHandler();
            console.log("!!!!USERS:", JSON.stringify(this.props.users.length));
        }
        if(this.props.addedReview)
        {
            this.props.loadRestaurantsEventHandler();
            this.props.loadUsersEventHandler();
            console.log("!!USERS:", JSON.stringify(this.props.users.length));
            console.log("!!RESTAURANTS:", JSON.stringify(this.props.restaurants.length));
        }
    }

  render() {
      // console.log("!!!!users:", JSON.stringify(typeof (this.props.users)));
      return (
            <Router>
                <div className="app-root">
                    <div className="app-header">
                        <TopBar/>
                        <h2>Restaurateur</h2>
                    </div>
                    <div className="app-body">
                        <Route exact path="/" component={Restaurants} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/login" component={LogInPage} />
                        <Route path="/viewProfile" component={ViewProfilePage} />
                        {/*<ViewProfilePage example='123'/>*/}
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
      users: state['app'].get('users'),
      addedUser: state['app'].get('addedUser'),
      addedReview: state['app'].get('addedReview'),
      restaurants: state['app'].get('restaurants'),
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
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
