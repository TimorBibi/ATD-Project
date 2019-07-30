import React from 'react';
import './AddReview.scss';
import {connect} from 'react-redux';
import {InputText} from 'primereact/inputtext';
import {Form, Input, Button} from "semantic-ui-react";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
import AddReviewActions from "../AddReview/actions";
import {Rating} from "primereact/components/rating/Rating";
import {Growl} from "primereact/components/growl/Growl";
import {InputTextarea} from 'primereact/inputtextarea';
import RestaurantsActions from "../Restaurants/actions";


class AddReview extends React.Component {

    constructor(){
        super();
        this.downloadFile = this.downloadFile.bind(this);
    }

    downloadFile(e) {
        const file = e.target.files[0];
        let fs = new FileReader();
        fs.onloadend = () => {
            let pictureData = fs.result;
            let value = {
                pictureType: file.type,
                pictureData: pictureData,
            };
            this.props.updateStateFieldEventHandler(e, {id:'picture' ,value: value});
        };
        fs.readAsDataURL(file);
    }

    componentDidUpdate() {
        if(this.props.submitMessage.message) {
            if (this.props.submitMessage.succeed)
                this.growl.show({severity: 'success', summary: this.props.submitMessage.message});
            else
                this.growl.show({severity: 'error', summary: this.props.submitMessage.message});
            this.props.initReviewMessageEventHandler();
        }
    }

    render() {
        return (
            <div>
                <Growl ref={(el) => this.growl = el} position="bottomright"/>
                <Form className="register-form"
              onSubmit={() => {
                  this.props.submitEventHandler(
                      this.props.username,
                      this.props.restaurantName,
                      this.props.restaurantLocation,
                      this.props.bathroomRate,
                      this.props.staffRate,
                      this.props.cleanRate,
                      this.props.foodRate,
                      this.props.driveInRate,
                      this.props.deliveryRate,
                      this.props.picture,
                      this.props.freeText,
                      this.props.locations,
                      this.props.showRestForm,
                  );
              }}>
                <Form.Field width='9'>
                    <label htmlFor="restaurantName" className="form-text">Restaurant name:</label>
                    <InputText id="restaurantName" value={this.props.restaurantName}
                               onChange={this.props.updateStateFieldEventHandler}
                               className="form-text form-input" />
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="restaurantLocation" className="form-text">Location:</label>
                    <AutoComplete id='restaurantLocation' value={this.props.restaurantLocation}
                                  onChange={this.props.updateStateFieldEventHandler}
                                  suggestions={this.props.suggestions}
                                  completeMethod={(e) => this.props.suggestLocationsEventHandler(this.props.locations, e)} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="bathroomRate" className="form-text">Bathroom Quality:</label>
                    <Rating id='bathroomRate' value={this.props.bathroomRate} cancel={false}
                            onChange={this.props.updateStateFieldEventHandler} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="staffRate" className="form-text">Staff Kindness:</label>
                    <Rating id='staffRate' value={this.props.staffRate} cancel={false}
                            onChange={this.props.updateStateFieldEventHandler} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="cleanRate" className="form-text">Cleanliness:</label>
                    <Rating id='cleanRate' value={this.props.cleanRate} cancel={false}
                            onChange={this.props.updateStateFieldEventHandler} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="foodRate" className="form-text">Food Quality:</label>
                    <Rating id='foodRate' value={this.props.foodRate} cancel={false}
                            onChange={this.props.updateStateFieldEventHandler} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="driveInRate" className="form-text">Drive-thru Quality:</label>
                    <Rating id='driveInRate' value={this.props.driveInRate}
                            onChange={this.props.updateStateFieldEventHandler} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="deliveryRate" className="form-text">Delivery Speed:</label>
                    <Rating id='deliveryRate' value={this.props.deliveryRate}
                            onChange={this.props.updateStateFieldEventHandler} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="picture" className="form-text">Restaurant Picture:</label>
                    <Input type="file" id="picture"  accept="image/*" onChange={this.downloadFile}/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="freeText" className="form-text">Review:</label>
                    <InputTextarea rows={5} cols={30} id="freeText"
                                   value={this.props.freeText} autoResize={true}
                                   onChange={this.props.updateStateFieldEventHandler} />
                </Form.Field>
                <button id="clearFields" className="ui button" type="button"
                        onClick={() => this.props.clearFieldsEventHandler()}
                >Clear Fields</button>
                <button id="cancel" className="ui button" type="button"
                        onClick={() => this.props.toggleAddReviewEventHandler(this.props.showRestForm)}
                >Cancel</button>
                <Form.Button  id="submit" content='Submit Review' type="submit" className="form-submit-button"/>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        restaurantName: state['addReview'].get('restaurantName'),
        restaurantLocation: state['addReview'].get('restaurantLocation'),
        locations: state['app'].get('locations'),
        suggestions: state['addReview'].get('suggestions'),
        submitMessage: state['addReview'].get('submitMessage'),
        bathroomRate: state['addReview'].get('bathroomRate'),
        staffRate: state['addReview'].get('staffRate'),
        cleanRate: state['addReview'].get('cleanRate'),
        foodRate: state['addReview'].get('foodRate'),
        driveInRate: state['addReview'].get('driveInRate'),
        deliveryRate: state['addReview'].get('deliveryRate'),
        freeText: state['addReview'].get('freeText'),
        picture: state['addReview'].get('picture'),
        username: state['app'].get('username'),
        isValid: state['addReview'].get('isValid'),
        showRestForm: state['restaurants'].get('showRestaurantForm'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateFieldEventHandler: (e, data) => {
            if (data) {
                dispatch(AddReviewActions.updateStateFieldAction(data.id, data.value));
            }
            else
                dispatch(AddReviewActions.updateStateFieldAction(e.target.id, e.target.value));
        },
        suggestLocationsEventHandler: (locations,e) => {
            dispatch(AddReviewActions.suggestLocationsAction(locations ,e.query));
        },
        clearFieldsEventHandler: () =>
        {
            dispatch(AddReviewActions.clearFieldsAction());
        },
        submitEventHandler: (username, name, location, bathroom, staff, clean, food, driveIn, delivery, picture, freeText, locations, toggle) => {
            dispatch(AddReviewActions.submitReviewAction(
                username,
                name,
                location,
                bathroom,
                staff,
                clean,
                food,
                driveIn,
                delivery,
                picture,
                freeText,
                locations,
                toggle));
        },
        initReviewMessageEventHandler:() => {
            dispatch(AddReviewActions.initReviewMessageAction());
        },
        toggleAddReviewEventHandler:(currVal) => {
            dispatch(RestaurantsActions.toggleRestaurantForm(currVal));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
