import React from 'react';
import './AddReview.scss';
import {connect} from 'react-redux';
import {Form, Button, Grid, Header, Segment} from "semantic-ui-react";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
import AddReviewActions from "../AddReview/actions";
import {Rating} from "primereact/components/rating/Rating";
import {Growl} from "primereact/components/growl/Growl";
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
        <Form className="add-review-form"  size='large' onSubmit={() => {
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
            this.props.clearFieldsEventHandler()
        }}>

        <Growl ref={(el) => this.growl = el} position="bottomright"/>
        <Header as='h2' color='violet' textAlign='center'>
            {/*<Image src='/logo.png' /> */}
            Add Review
        </Header>
        <Segment stacked className= 'add_review_form'>
        <Grid textAlign='center' verticalAlign='middle' >
            <Grid.Row columns={3}>
                <Grid.Column >
                    <Form.Input fluid icon='utensils' iconPosition='left' placeholder='Restaurant name'
                                id='restaurantName' value={this.props.restaurantName}
                                onChange={this.props.updateStateFieldEventHandler}/>

                    <Form.Field>
                        <AutoComplete id='restaurantLocation' value={this.props.restaurantLocation} placeholder='Location'
                                      className= 'location_field'
                                      onChange={this.props.updateStateFieldEventHandler}
                                      suggestions={this.props.suggestions}
                                      completeMethod={(e) => this.props.suggestLocationsEventHandler(this.props.locations, e)} />
                    </Form.Field>

                    <Form.Input fluid type='file' id="picture"  accept="image/*"
                                onChange={this.downloadFile}/>

                </Grid.Column>
                <Grid.Column>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Bathroom Quality
                        </Header>                        <Rating id='bathroomRate' value={this.props.bathroomRate} cancel={false}
                                onChange={this.props.updateStateFieldEventHandler} />
                    </Form.Field>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Staff Kindness
                        </Header>
                        <Rating id='staffRate' value={this.props.staffRate} cancel={false}
                                onChange={this.props.updateStateFieldEventHandler} />
                    </Form.Field>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Cleanliness
                        </Header>
                        <Rating id='cleanRate' value={this.props.cleanRate} cancel={false}
                                onChange={this.props.updateStateFieldEventHandler} />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column >
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Food Quality
                        </Header>
                        <Rating id='foodRate' value={this.props.foodRate} cancel={false}
                                onChange={this.props.updateStateFieldEventHandler} />
                    </Form.Field>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Drive-thru Quality
                        </Header>
                        <Rating id='driveInRate' value={this.props.driveInRate}
                                onChange={this.props.updateStateFieldEventHandler} />
                    </Form.Field>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Delivery Speed
                        </Header>
                        <Rating id='deliveryRate' value={this.props.deliveryRate}
                                onChange={this.props.updateStateFieldEventHandler} />
                    </Form.Field>
                </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={1}>
            <Grid.Column>
            <Header className= 'rating_title' as='h4'>
                Description
            </Header>
            <Form.TextArea id='freeText' value={this.props.freeText}
                           onChange={this.props.updateStateFieldEventHandler}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
            <Grid.Column >
                <Button color='violet' id="cancel" fluid size='large' type="button" className='add_review_btn_left'
                        onClick={() => this.props.toggleAddReviewEventHandler(this.props.showRestForm)}>
                    Cancel
                </Button>
            </Grid.Column>
            <Grid.Column >
                <Button color='violet' id="submit" fluid size='large' type="submit" className='add_review_btn'>
                    Submit
                </Button>
            </Grid.Column>
            <Grid.Column >
                <Button color='violet' id="clearFields" fluid size='large' type="button" className='add_review_btn_right'
                        onClick={() => this.props.clearFieldsEventHandler()}>
                        Clear Fields
                </Button>
            </Grid.Column>
        </Grid.Row>
        </Grid>
        </Segment>
        </Form>
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
        updateStateFieldEventHandler: (e, data) =>
        {
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
