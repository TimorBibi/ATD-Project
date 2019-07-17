import React from 'react';
import './App.scss';
import TopBar from '../TopBar';
import ReviewForm from '../ReviewForm';
import { connect } from 'react-redux';
import AppActions from './actions';
import GalleryActions from '../Gallery/actions';
import RegisterPage from "../RegisterPage/RegisterPage";



class App extends React.Component {
    componentDidMount() {
        // this.props.loadTagsEventHandler();
    }

  render() {
        const activePage = () => {
            switch (this.props.activePage) {
                case 'register': return <RegisterPage/>;
                default: return <RegisterPage/>;
            }
        }
        return (
            <div className="app-root">
                <div className="app-header">
                    <TopBar/>
                    <h2>Restaurateur</h2>
                </div>
                <div className="app-body">
                    {activePage()}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
  return {
      tag: state['app'].get('tag'),
      tags: state['app'].get('tags').toArray(),
      activePage: state['topbar'].get('activeItem'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTagsEventHandler: () => {
      dispatch(AppActions.loadTagsAction());
    },
    updateTagEventHandler: (e) => {
      dispatch(AppActions.updateTagAction(e.value));
    },
    loadImagesEventHandler: (tag) => {
      dispatch(GalleryActions.loadImagesAction(tag))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
