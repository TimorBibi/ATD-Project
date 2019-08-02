import React from 'react';
import './Restaurants.scss';
import {connect} from 'react-redux';
import RestaurantsActions from '../Restaurants/actions';
import {Button, Form, Label, Input, Segment, Grid, Header} from 'semantic-ui-react'
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {List, Map} from 'immutable'
import AddReview from "../AddReview/AddReview";
import {Slider} from "primereact/components/slider/Slider";
import {Dropdown} from "primereact/dropdown";
import Review from "../Review/Review";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
import { Icon } from 'semantic-ui-react'

class Restaurants extends React.Component {

    constructor(){
        super();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.viewRestaurantItem = this.viewRestaurantItem.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.searchBy = this.searchBy.bind(this);
        this.resetSearchField = this.resetSearchField.bind(this);
        this.resetSearchReviewField = this.resetSearchReviewField.bind(this);
        this.sortReviewBy = this.sortReviewBy.bind(this);
        this.criteriaField = this.criteriaField.bind(this);
        this.culcCloserBetter = this.culcCloserBetter.bind(this);
    }

    componentDidUpdate(){
        if (this.props.didUpdate) {
            this.props.updateShowRestaurantsEventHandler(this.culcCloserBetter(this.searchBy()));
        }
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

    viewRestaurantItem(restaurant, showReviews, header)
    {
        const hasReviews = (!restaurant.avgRate && !restaurant.reviews.length);
        const reviewsIfExist = hasReviews?
            <Header className= 'no_reviews' id="no_reviews" as='p' color='grey'>no reviews</Header>:
            <Button id={restaurant.name+"_"+restaurant.location.city} className='restaurant_show_reviews'
                    onClick={(e, data) => this.props.showReviewsEventHandler(data, this.props.showReviews, restaurant.reviews)}
             >Reviews</Button>;
            const reviewRate = hasReviews?
                null :
                <Label id="avgRate" className= 'show_restaurant float_left' as='p' color='violet' ribbon>
                    Rate: {Math.round(restaurant.avgRate * 100) / 100}
                </Label>;
        return(
            <div className='restaurant_item'>
            <Segment stacked>
                <Grid verticalAlign='middle'>
                    <Grid.Row columns={2}>
                    <Grid.Column>
                    <Header className= 'show_restaurant' id="name" as='h1' color='grey'>
                        {restaurant.name}
                    </Header>
                    <Header className= 'show_restaurant' id="location" as='h5' color='grey'>
                        {restaurant.location.city}
                    </Header>
                    {reviewRate}
                    </Grid.Column>
                    <Grid.Column>
                     {reviewsIfExist}
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
                {header}
                {showReviews}
            </div>
        );
    }

    criteriaField(review, criteria)
    {
        switch (criteria) {
            case 'bathroom':
                return review.bathroom;
            case 'staff':
                return review.staff;
            case 'clean':
                return review.clean;
            case 'driveIn':
                return review.driveIn;
            case 'delivery':
                return review.delivery;
            case 'food':
                return review.food;
            default:
                return 5;
        }
    }

    sortReviewBy(reviews)
    {
        let currtime = new Date().toJSON();
        const show = this.props.showOnlyReviewValue;
        const criteria = this.props.criteriaReviewValue.substring(this.props.criteriaReviewValue.indexOf(':')+1);
        const sort = this.props.sortReviewValue;
        const minRate = this.props.ratingRangeReviewValues[0];
        const maxRate = this.props.ratingRangeReviewValues[1];
        let timeParseValue;
        switch (show) {
        case 'showOnlyReviewValue:week':
            timeParseValue = 10;
            break;
        case 'showOnlyReviewValue:month':
            timeParseValue = 7;
            break;
        case 'showOnlyReviewValue:year':
            timeParseValue = 4;
            break;
        default ://all
            timeParseValue = 0;
        }


        let output = reviews.filter((review)=> (timeParseValue === 0? (this.criteriaField(review, criteria) >= minRate
            && this.criteriaField(review, criteria) <= maxRate):
            (((timeParseValue !== 10) &&
            (currtime.substring(0,timeParseValue) === review.timeStamp.substring(0,timeParseValue)))
            || ((timeParseValue === 10) &&
            (Math.abs(Number(currtime.substring(8,10)) - Number(review.timeStamp.substring(8,10)))<= 7))))
            && (this.criteriaField(review, criteria) >= minRate && this.criteriaField(review, criteria) <= maxRate));

        if(sort === 'sortReviewValue:newFirst')
            return (List)(output).sortBy((review) => review.timeStamp).reverse();
        return (List)(output).sortBy((review) => review.timeStamp);
    }

    resetSearchReviewField(restaurant)
    {
       this.props.updateReviewSearchValueEventHandler();
       this.props.updateShowReviewsEventHandler(restaurant.reviews);
    }

    reviewHeader(restaurant) {

        const sortOptions = [
            {label: 'Newest First', value: 'sortReviewValue:newFirst'},
            {label: 'Oldest First', value: 'sortReviewValue:oldFirst'},
        ];

        const showOnlyOptions = [
            {label: 'Last Week', value: 'showOnlyReviewValue:week'},
            {label: 'Last Month', value: 'showOnlyReviewValue:month'},
            {label: 'Last Year', value: 'showOnlyReviewValue:year'},
            {label: 'All Times', value: 'showOnlyReviewValue:all'},
        ];

        const criteriaOptions = [
            {label: 'Bathroom Quality', value: 'criteriaReviewValue:bathroom'},
            {label: 'Staff Kindness', value: 'criteriaReviewValue:staff'},
            {label: 'Cleanliness', value: 'criteriaReviewValue:clean'},
            {label: 'Drive-thru quality', value: 'criteriaReviewValue:driveIn'},
            {label: 'Delivery Speed', value: 'criteriaReviewValue:delivery'},
            {label: 'Food Quality', value: 'criteriaReviewValue:food'},
        ];

        const criteriaSlider = this.props.criteriaReviewValue ==='criteriaReviewValue:'? null:
            <div className="criteria_slider">
            <h4>Rating Range: {this.props.ratingRangeReviewValues[0]},{this.props.ratingRangeReviewValues[1]}</h4>
            <Slider id="ratingRangeReviewValues" value={this.props.ratingRangeReviewValues} min={1} max={5} animate={true}
                        onChange={this.props.updateReviewSliderFieldEventHandler} range={true} style={{width: '14em'}} />
             </div>;
        return (
            <Grid centered className="p-grid review_sort" textAlign="left">
                <Grid.Row centered className='first_row'>
                    <label htmlFor="sortReview" className="sort_title">Sort Reviews By</label>
                    <label htmlFor="showOnlyReview" className="sort_title">Show reviews since</label>
                    <label htmlFor="criteriaReview" className="sort_title">Criteria </label>
                </Grid.Row>
                <Grid.Row centered className='second_row'>
                <label className="search-label" htmlFor="sort"><Icon name="sort"/>Sort Reviews:  </label>
                    <div className="p-col-6 sort" style={{textAlign: 'left'}}>
                        <Dropdown key = "sortReviewValue" options={sortOptions} value={this.props.sortReviewValue} placeholder="Newest First"
                                  onChange={(e) => (this.props.updateSearchReviewEventHandler(e.value))} />
                    </div>
                    <div className="p-col-6 sort">
                        <Dropdown  key = "showOnlyReviewValue" options={showOnlyOptions} value={this.props.showOnlyReviewValue} placeholder="All Times"
                                  onChange={(e) => (this.props.updateSearchReviewEventHandler(e.value))} />
                    </div>
                    <div className="p-col-6 sort">
                        <Dropdown  key = "criteriaReviewValue" options={criteriaOptions} value={this.props.criteriaReviewValue} placeholder=""
                                  onChange={(e) => (this.props.updateSearchReviewEventHandler(e.value))} />
                    </div>

                </Grid.Row>
                <Grid.Row centered>
                    <Button id="searchReviewButton"  className="ui button"
                            onClick={() => (this.props.updateShowReviewsEventHandler(this.sortReviewBy(restaurant.reviews)))}
                    >Search</Button>

                    <Button id="showAllReviewsButton"  className="ui button"
                            onClick={() => (this.resetSearchReviewField(restaurant))}
                    >Show All Reviews</Button>
                    {criteriaSlider}
                </Grid.Row>
            </Grid>
        );
    }

    itemTemplate(restaurant, layout) {
        if (layout === 'list') {
            const reviewsCond = ((this.props.showReviews.get('selectedRest') === restaurant.name+"_"+restaurant.location.city)
                && this.props.showReviews.get('visible') && restaurant.reviews.length > 0);

            const header = reviewsCond? this.reviewHeader(restaurant): null;
            const showReviews = reviewsCond?
                this.props.reviewsToShow.map((review) =>
                    <Review review={review} key={review.username+'_'+review.timeStamp+"comp"}/> )
                : null;
            return (this.viewRestaurantItem(restaurant, showReviews, header));
        }
    }

    resetSearchField()
    {
        this.props.updateSearchValueEventHandler();
        this.props.updateShowRestaurantsEventHandler(this.props.restaurants);
    }

    culcCloserBetter(rests)
    {
        const closerBetterValue = this.props.closerBetterValues;
        if(closerBetterValue === null)
            return rests;
        const myLocation = this.props.users.find((user)=> user.username === this.props.username).location;

        const locations = rests.map((rest)=> rest.location);

        const dists = locations.map((loc) => Math.sqrt(Math.pow((myLocation.x- loc.x), 2) + Math.pow((myLocation.y - loc.y), 2)));

        const maxDist = Math.max(...dists);

        const normDists = dists.map((dist)=> dist/maxDist);

        const normRates = rests.map((rest) => (1 - (rest.avgRate -1)/4));

        const closerBetterValues = normDists.map((dist, index) =>
            ((normRates[index]*closerBetterValue) + (dist *(4 - closerBetterValue))));


        const output = rests.sort(function (a, b)
        {

            if (closerBetterValues[rests.indexOf(a)] > closerBetterValues[rests.indexOf(b)]) {
                return 1;
            } else {
                return -1;
            }

        });
        return output;

    }

    searchBy()
    {
        const name = this.props.searchNameValue;
        const location = this.props.searchLocationValue;
        const lvalue = this.props.ratingRangeValues[0];
        const rvalue = this.props.ratingRangeValues[1];
        const restaurants = this.props.restaurants;

        return restaurants.filter((rest)=> name === ''? true: rest.name === name)
            .filter((rest)=> location === ''? true: rest.location.city === location)
            .filter((rest)=> rest.avgRate === 0 || (rest.avgRate >= lvalue && rest.avgRate <= rvalue));
    }

    restaurantHeader() {

        const allowAddReview = !this.props.isConnected ? null :
            <Button label="Add Review" icon="plus"
                    onClick={() => this.props.toggleRestaurantFormEventHandler(this.props.showRestForm)}/>;

        const showCloserBetter = this.props.isConnected?
            (<Grid centered>
                <Grid.Row centered id="closer-label-row">
                    <label className="search-label closer-better">Closer-Better</label>
                </Grid.Row>
                <Grid.Row centered>
                    <Slider  id="closer-betterValues"
                             value={this.props.closerBetterValues} min={0} max={4}
                             onChange={(e)=>{
                                 this.props.updateSliderCloserBetterEventHandler(e);
                                 (this.props.updateShowRestaurantsEventHandler(this.culcCloserBetter(this.searchBy())))}
                             } />
                </Grid.Row>
            </Grid>): null;
        return (
            <Grid centered className='rest_search'>
                <Grid.Row centered>
                    <label className="search-label" htmlFor="search"><Icon name="search"/>Search Restaurant: </label>
                    <AutoComplete id="searchNameValue" placeholder="Name" className="search"
                                  value={this.props.searchNameValue}
                                  onChange={this.props.updateStateFieldEventHandler}
                                  suggestions={this.props.suggestions}
                                  completeMethod={(e) => this.props.suggestionsEventHandler((this.props.restaurants.map((rest)=> rest.name)), e)}/>

                    <AutoComplete id="searchLocationValue" placeholder="Location" className="search"
                                  value={this.props.searchLocationValue}
                                  onChange={this.props.updateStateFieldEventHandler}
                                  suggestions={this.props.suggestions}
                                  completeMethod={(e) => this.props.suggestionsEventHandler(this.props.locations, e)}/>

                    <label className="search-label search">
                        Rating Range: {this.props.ratingRangeValues[0]},{this.props.ratingRangeValues[1]}
                    </label>
                    <Slider id="ratingRangeValues" className="search slider"
                            value={this.props.ratingRangeValues} min={1} max={5} animate={true}
                            onChange={this.props.updateSliderFieldEventHandler} range={true} />
                </Grid.Row>
                    {showCloserBetter}
                <Grid.Row centered className="row-margin">
                    <Button id="searchButton"  className="ui button header-button"
                            onClick={() => (this.props.updateShowRestaurantsEventHandler(this.culcCloserBetter(this.searchBy())))}
                    >Search</Button>

                    <Button id="showAllButton"  className="ui button header-button"
                            onClick={() => (this.resetSearchField())}
                    >Show All Restaurants</Button>
                    {allowAddReview}
                </Grid.Row>
            </Grid>
        );
    }

    render() {
        const header = this.restaurantHeader();

        const addReview = this.props.showRestForm? <AddReview/>: null;
        return (
            <div className='restaurants'>
                {header}
                {addReview}
                <DataView value={this.props.restaurantsToShow} layout="list"
                          itemTemplate={this.itemTemplate}
                          rows={this.props.restaurantsToShow.length}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        showRestForm: state['restaurants'].get('showRestaurantForm'),
        isConnected: state['app'].get('isConnected'),
        restaurants: (List) (state['app'].get('restaurants')).toArray(),
        users: (List) (state['app'].get('users')).toArray(),
        locations: state['app'].get('locations'),
        suggestions: state['restaurants'].get('suggestions'),
        restaurantsToShow: (List) (state['restaurants'].get('restaurantsToShow')).toArray(),
        showReviews: state['restaurants'].get('showReviews'),
        editReview: state['restaurants'].get('editReview'),
        showOnlyReviewValue:state['restaurants'].get('showOnlyReviewValue'),
        criteriaReviewValue:state['restaurants'].get('criteriaReviewValue'),
        sortReviewValue:state['restaurants'].get('sortReviewValue'),
        ratingRangeReviewValues:state['restaurants'].get('ratingRangeReviewValues'),
        reviewsToShow:(List) (state['restaurants'].get('reviewsToShow')).toArray(),
        username: state['app'].get('username'),
        searchNameValue:state['restaurants'].get('searchNameValue'),
        searchLocationValue:state['restaurants'].get('searchLocationValue'),
        ratingRangeValues:state['restaurants'].get('ratingRangeValues'),
        closerBetterValues:state['restaurants'].get('closerBetterValues'),
        submitMessage: state['restaurants'].get('submitMessage'),
        didUpdate: state['restaurants'].get('restDidUpdate'),
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleRestaurantFormEventHandler: (newVal) => {
             dispatch(RestaurantsActions.toggleRestaurantForm(newVal));
         },
        updateStateFieldEventHandler: (e, data) => {
            if (data) {
                dispatch(RestaurantsActions.updateStateFieldAction(data.id, data.value));
            }
            else
                dispatch(RestaurantsActions.updateStateFieldAction(e.target.id, e.target.value));
        },
        updateSliderFieldEventHandler: (e) => {
            dispatch(RestaurantsActions.updateSliderFieldAction(e.value));
        },
        initToShowRestsEventHandler: (restaurants) => {
          dispatch(RestaurantsActions.initToShowRestsAction(restaurants));
        },
        showReviewsEventHandler: (data, prevReviewValue, reviews) => {
            dispatch(RestaurantsActions.showReviewsAction(prevReviewValue, data.id, reviews));
        },
        deleteReviewEventHandler: (reviewContent) => {
            dispatch(RestaurantsActions.deleteReviewAction(reviewContent));
        },
        submitEditEventHandler: (username, name, location, timeStamp, bathroom, staff, clean, food, driveIn, delivery, picture, freeText) => {
            dispatch(RestaurantsActions.submitEditReviewAction(
                username,
                name,
                location,
                timeStamp,
                bathroom,
                staff,
                clean,
                food,
                driveIn,
                delivery,
                picture,
                freeText));
        },
        updateShowRestaurantsEventHandler: (restaurants) => {
            dispatch(RestaurantsActions.updateShowRestaurantsAction(restaurants, false));
        },

        updateSearchValueEventHandler: () => {
            dispatch(RestaurantsActions.updateSearchValueAction());
        },

        updateSearchReviewEventHandler: (value) =>{
            dispatch(RestaurantsActions.updateSearchReviewAction(value));
        },

        updateReviewSliderFieldEventHandler: (e) =>{
            dispatch(RestaurantsActions.updateReviewSliderFieldAction(e.value));
        },

        updateShowReviewsEventHandler:(reviews) => {
            dispatch(RestaurantsActions.updateShowReviewsAction(reviews));

        },
        updateReviewSearchValueEventHandler:() =>{
            dispatch(RestaurantsActions.updateReviewSearchValueAction());
        },
        updateSliderCloserBetterEventHandler:(e) => {
            dispatch(RestaurantsActions.updateSliderCloserBetterAction(e.value));
        },
        suggestionsEventHandler: (suggest, e) => {
            dispatch(RestaurantsActions.suggestionsAction(suggest ,e.query));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
