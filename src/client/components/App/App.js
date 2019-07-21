import React from 'react';
import './App.scss';
import TopBar from '../TopBar';
import { connect } from 'react-redux';
import AppActions from './actions';
import RegisterPage from "../RegisterPage/RegisterPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogInPage from '../LogInPage/LogInPage';
import Restaurants from '../Restaurants/Restaurants';


class App extends React.Component {

    componentDidMount(){
        this.props.checkTokenEventHandle();
        // if(this.props.locations.length === 0)
            this.props.loadCitiesEventHandler();
        // console.log(this.props.locations);
    }

  render() {
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
