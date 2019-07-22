import React from 'react';
import './Restaurants.scss';
import {connect} from 'react-redux';
import RestaurantsActions from '../Restaurants/actions';
import { Button } from 'semantic-ui-react'
import {InputText} from "primereact/components/inputtext/InputText";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
import {Form} from 'semantic-ui-react';
import {Growl} from 'primereact/growl';
import AddReview from "../AddReview/AddReview";




class Restaurants extends React.Component {

    //TODO validate filled props
    //TODO display all the restaurants
    render() {
        const allowAddReview = !this.props.isConnected ? null :
            <Button label="Add Review" icon="plus" onClick={() => this.props.toggleRestaurantFormEventHandler(this.props.showRestForm)}/>

        const addReview = this.props.showRestForm? <AddReview/>: null;
        return (

            <div className='restaurants'>
                {allowAddReview}
                {addReview}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        showRestForm: state['restaurants'].get('showRestaurantForm'),
        isConnected: state['app'].get('isConnected'),
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleRestaurantFormEventHandler: (currVal) => {
             dispatch(RestaurantsActions.toggleRestaurantForm(currVal));
         },
        updateStateFieldEventHandler: (e) => {
            dispatch(RestaurantsActions.updateStateFieldAction(e.target.id, e.target.value));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
