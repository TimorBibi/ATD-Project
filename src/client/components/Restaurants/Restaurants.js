import React from 'react';
import './Restaurants.scss';
import {connect} from 'react-redux';
import RestaurantsActions from '../Restaurants/actions';
import {Button} from 'primereact/button';
import {InputText} from "primereact/components/inputtext/InputText";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
import {Form} from 'semantic-ui-react';



class Restaurants extends React.Component {
    //TODO add review filed (mybe? for submitting)
    //TODO validate filled props
    //TODO sing the new restaurant
    //TODO display all the restaurants
    render() {
        const restForm = !this.props.showRestForm ? null: (
            <Form className="register-form" onSubmit={() => {
                this.props.submitEventHandler(
                    this.props.restaurantName,
                    this.props.restaurantLocation,
                    this.props.isValid);}}>
                <Form.Field width='9'>
                <span className="p-float-label">
                    <InputText id="restaurantName" value={this.props.restaurantName}
                               onChange={this.props.updateStateFieldEventHandler}
                               className="form-text form-input" />
                    <label htmlFor="restaurantName" className="form-text">Restaurant name</label>
                </span>
                </Form.Field>
                <Form.Field width='9'>
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
                <Button label="New restaurant" icon="pi pi-plus" onClick={() => this.props.toggleRestaurantFormEventHandler(this.props.showRestForm)}/>
                {restForm}
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
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleRestaurantFormEventHandler: (currVal) => {
             dispatch(RestaurantsActions.toggleRestaurantForm(currVal));
         },
        updateStateFieldEventHandler: (e, data) => {
            // if (data) {
            //     dispatch(RestaurantsActions.updateStateFieldAction(data.id, data.value));
            // }
            // else
                dispatch(RestaurantsActions.updateStateFieldAction(e.target.id, e.target.value));
        },
        suggestLocationsEventHandler: (locations,e) => {
            dispatch(RestaurantsActions.suggestLocationsAction(locations ,e.query));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
