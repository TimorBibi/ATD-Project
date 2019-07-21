import React from 'react';
import './App.scss';
import TopBar from '../TopBar';
import { connect } from 'react-redux';
import AppActions from './actions';
import RegisterPage from "../RegisterPage/RegisterPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReviesForm from '../ReviewForm/ReviewForm'
import LogInPage from '../LogInPage/LogInPage'




class App extends React.Component {

    componentDidMount(){
        this.props.checkTokenEventHandle();
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
                        <Route exact path="/" component={ReviesForm} />
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
      isConnected : state['app'].get('isConnected'),
      username: state['app'].get('username'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      checkTokenEventHandle: () => {
          dispatch(AppActions.checkTokenAction());
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
