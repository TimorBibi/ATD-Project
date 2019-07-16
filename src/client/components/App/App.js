import React from 'react';
import './App.scss';
import TopBar from '../TopBar';
// import Gallery from '../Gallery';
import ReviewForm from '../ReviewForm';
import { connect } from 'react-redux';
import AppActions from './actions';
import GalleryActions from '../Gallery/actions';
// import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import {Button} from 'semantic-ui-react';
// import Button from 'semantic-ui-react/dist/es/elements/Button/Button.js';



class App extends React.Component {
    componentDidMount() {
        this.props.loadTagsEventHandler();
    }

  render() {
        console.log('tags=', this.props.tags);
    return (
      <div className="app-root">
        <div className="app-header">
            <TopBar/>
          <h2>Restaurateur</h2>
          <Dropdown
              value={this.props.tag}
              onChange={this.props.updateTagEventHandler}
              options={this.props.tags}
              placeholder="insert a tag"
              editable={true}
            />
          {/*<Button*/}
          {/*    color='red'*/}
          {/*    label="Search"*/}
          {/*    className="p-button-raised p-button-rounded"*/}
          {/*    onClick={() => this.props.loadImagesEventHandler(this.props.tag)}*/}
          {/*/>*/}
            <Button color='red'>Red</Button>
        </div>
        <ReviewForm/>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      tag: state['app'].get('tag'),
      tags: state['app'].get('tags').toArray()
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
