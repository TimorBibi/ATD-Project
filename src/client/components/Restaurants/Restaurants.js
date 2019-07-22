import React from 'react';
import './Restaurants.scss';
import {connect} from 'react-redux';
import RestaurantsActions from '../Restaurants/actions';
import { Button } from 'semantic-ui-react'
import {InputText} from "primereact/components/inputtext/InputText";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
import {Form} from 'semantic-ui-react';
import {Growl} from 'primereact/growl';




class Restaurants extends React.Component {

    componentDidUpdate() {
        if (this.props.submitMessage.message && this.props.submitMessage.succeed)
            this.growl.show({severity: 'success', summary: this.props.submitMessage.message});
        else if (this.props.submitMessage.message)
            this.growl.show({severity: 'error', summary: this.props.submitMessage.message});
    }

    //TODO validate filled props
    //TODO display all the restaurants
    render() {
        const restForm = !this.props.showRestForm ? null: (
            <Form className="register-form" onSubmit={() => {
                this.props.submitEventHandler(
                    this.props.restaurantName,
                    this.props.restaurantLocation);}}>
                <Form.Field width='9'>
                    <label htmlFor="restaurantName" className="form-text">Restaurant name</label>
                    <InputText id="restaurantName" value={this.props.restaurantName}
                               onChange={this.props.updateStateFieldEventHandler}
                               className="form-text form-input" />
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="restaurantLocation" className="form-text">Location</label>
                    <AutoComplete id='restaurantLocation' value={this.props.restaurantLocation}
                                  onChange={this.props.updateStateFieldEventHandler}
                                  suggestions={this.props.suggestions}
                                  completeMethod={(e) => this.props.suggestLocationsEventHandler(this.props.locations, e)} />
                </Form.Field>
                <Form.Button content='Add restaurant' type="submit"/>
            </Form>
        );

        return (
            <div className='restaurants'>
                <Button label="New restaurant" icon="plus" onClick={() => this.props.toggleRestaurantFormEventHandler(this.props.showRestForm)}/>
                {restForm}
                <Growl ref={(el) => this.growl = el} position="bottomright"/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        showRestForm: state['restaurants'].get('showRestaurantForm'),
        restaurantName: state['restaurants'].get('restaurantName'),
        restaurantLocation: state['restaurants'].get('restaurantLocation'),
        locations: state['app'].get('locations'),
        suggestions: state['restaurants'].get('suggestions'),
        review: state['restaurants'].get('review'),
        submitMessage: state['restaurants'].get('submitMessage'),
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
        suggestLocationsEventHandler: (locations,e) => {
            dispatch(RestaurantsActions.suggestLocationsAction(locations ,e.query));
        },
        submitEventHandler: (name, location) => {
            dispatch(RestaurantsActions.submitRestaurantAction(name, location));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
