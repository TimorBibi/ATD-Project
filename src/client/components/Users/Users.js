import React from 'react';
import './Users.scss';
import {connect} from 'react-redux';
import {Button, Form, Label, Input, Segment, Grid, Header, Image, Icon} from 'semantic-ui-react'
import {Dropdown} from "primereact/dropdown";
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {List, Map} from 'immutable';
import {AutoComplete} from 'primereact/autocomplete';
import {Rating} from 'primereact/rating';
import UsersActions from '../Users/actions';
import Review from "../Review/Review";
import {Slider} from "primereact/components/slider/Slider";

class Users extends React.Component {

    constructor(){
        super();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.viewUserItem = this.viewUserItem.bind(this);
        this.searchBy = this.searchBy.bind(this);
        this.resetSearchField = this.resetSearchField.bind(this);
    }

        componentDidUpdate() {
        if (this.props.movetoViewProfilePage)
            this.props.history.push('/viewProfile'); //reload the root page
    }

    viewUserItem(user, showReviews)
    {
        const imgsrc = user.picture.data;
        const myProfile = user.username !== this.props.username ? null:
            (<div>
                <Button id={"profile_"+user.username} className='users_show_reviews'
                    onClick={() => this.props.moveToUserProfileEventHandler()}
                >My Profile</Button>
            </div>);
        const hasReviews = (!user.reviews.length)?
            (<Header className= 'no_reviews' id="no_reviews" as='p' color='grey'>no reviews</Header>):
            (<div>
                <Button id={user.username} className='users_show_reviews'
                        onClick={(e, data) =>
                            this.props.showUserReviewsEventHandler(data, this.props.showReviews)}
                >Reviews</Button>
            </div>);
        return(
            <div className='user_item'>
                <Segment stacked>
                    <Grid  verticalAlign='middle'>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Grid columns={2}>
                                    <Grid.Column>
                                        <Image src={imgsrc} size='small' spaced='left'/>
                                    </Grid.Column>
                                    <Grid.Column verticalAlign='middle'>
                                    <Header className= 'show_user' id="userName" as='h1' color='grey'>
                                        {user.username}
                                    </Header>
                                    <Header className= 'show_user' id="location" as='h5' color='grey'>
                                        {user.location.city}
                                    </Header>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column>
                                {myProfile}
                                {hasReviews}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {showReviews}
            </div>
        );
    }


    itemTemplate(user, layout) {
        if (layout === 'list') {
            const showReviews = ((this.props.showReviews.get('selectedUser') === user.username)
                                && this.props.showReviews.get('visible')
                                 && user.reviews.length > 0) ?
                user.reviews.map((review) =>
                <Review review={review} key={review.username+"_user_"+review.timeStamp} /> )
                : null;
            return (this.viewUserItem(user, showReviews));
        }
    }

    resetSearchField()
    {
        this.props.updateSearchKeyEventHandler('');
        this.props.updateSearchValueEventHandler('');
        this.props.updateShowUsersEventHandler(this.props.users);
    }
    searchBy()
    {
        const key = this.props.searchKey;
        const value = this.props.searchValue;
        const users = this.props.users;

        if (!value || !key)
            return users;

        if(key === 'user')
            return users.filter((user)=> user.username.toLowerCase() === value.toLowerCase());
        if(key === 'location')
            return users.filter((user)=> user.location.city.toLowerCase() === value.toLowerCase());
        if(key === 'restaurant')
            return users.filter((user)=> user.reviews.length > 0?
                user.reviews.filter((review)=> review.name === value).length > 0 : false);
    }

    renderHeader() {
        const searchOptions = [
            {label: 'User Name', value: 'user'},
            {label: 'User Location', value: 'location'},
            {label: 'Restaurant Name', value: 'restaurant'}
        ];

        return (
            <Grid centered className='user_search'>
                <Grid.Row centered>
                    <label className="search-label" htmlFor="search"><Icon name="search"/>Search User: </label>
                    <Dropdown options={searchOptions} value={this.props.searchKey} className="search"
                         onChange={(e) => (this.props.updateSearchKeyEventHandler(e.value, this.props.locations,
                         this.props.users, this.props.restaurants))} />

                    <AutoComplete id="searchValue" onChange={this.props.updateStateFieldEventHandler} className="search"
                          suggestions={this.props.suggestions}
                          value = {this.props.searchValue}
                          completeMethod={(e) => this.props.suggestionsEventHandler(this.props.selectedSuggestionsOption, e)}/>

                </Grid.Row>
                <Grid.Row centered className="row-margin">
                             <Button id="searchButton"  className="ui button header-button"
                                     onClick={() => (this.props.updateShowUsersEventHandler(this.searchBy()))}
                             >Search</Button>
                             <Button id="showAllButton"  className="ui button header-button"
                                     onClick={() => (this.resetSearchField())}
                             >Show All Users</Button>
                </Grid.Row>
            </Grid>
            // <div className="p-grid">
            //     <div className="p-col-6" style={{textAlign: 'left'}}>
            //         <Dropdown options={searchOptions} value={this.props.searchKey} placeholder="Search By"
            //                   onChange={(e) =>
            //         (this.props.updateSearchKeyEventHandler(e.value, this.props.locations,
            //             this.props.users, this.props.restaurants))} />
            //
            //         <AutoComplete id="searchValue" onChange={this.props.updateStateFieldEventHandler}
            //                       suggestions={this.props.suggestions}
            //                       value = {this.props.searchValue}
            //                       completeMethod={(e) => this.props.suggestionsEventHandler(this.props.selectedSuggestionsOption, e)}/>
            //
            //         <Button id="searchButton"  className="ui button"
            //                 onClick={() => (this.props.updateShowUsersEventHandler(this.searchBy()))}
            //         >Search</Button>
            //         <Button id="showAllButton"  className="ui button"
            //                 onClick={() => (this.resetSearchField())}
            //         >Show All Users</Button>
            //     </div>
            //     <div className="p-col-6" style={{textAlign: 'right'}}>
            //     </div>
            // </div>
        );
    }

    render() {
        const header = this.renderHeader();

        return (
            <div className='users'>
                {header}
                <DataView value={this.props.usersToShow} layout="list"
                          itemTemplate={this.itemTemplate}
                          rows={this.props.users.length}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        searchKey: state['users'].get('searchKey'),
        searchValue: state['users'].get('searchValue'),
        showRestForm: state['users'].get('showRestaurantForm'),
        isConnected: state['app'].get('isConnected'),
        users: (List) (state['app'].get('users')).toArray(),
        locations: state['app'].get('locations'),
        restaurants: (List) (state['app'].get('restaurants')).toArray(),
        suggestions: (List) (state['users'].get('suggestions')).toArray(),
        selectedSuggestionsOption: (List) (state['users'].get('selectedSuggestionsOption')).toArray(),
        usersToShow: (List) (state['users'].get('usersToShow')).toArray(),
        showReviews: state['users'].get('showReviews'),
        username: state['app'].get('username'),
        movetoViewProfilePage: state['users'].get('movetoViewProfilePage'),
        didUpdate: state['users'].get('usersDidUpdate'),
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateFieldEventHandler: (e) => {
            dispatch(UsersActions.updateStateFieldAction(e.target.id, e.target.value));
        },
        showUserReviewsEventHandler: (data, prevReviewValue) => {
            dispatch(UsersActions.showUserReviewsAction(prevReviewValue, data.id));
        },
        moveToUserProfileEventHandler:() => {
            dispatch(UsersActions.moveToUserProfileAction());
        },
        updateShowUsersEventHandler: (users) => {
            dispatch(UsersActions.updateShowUsersAction(users, false));
        },
        updateSearchKeyEventHandler: (key, locations, users, restaurants) => {
            dispatch(UsersActions.updateSearchKeyAction(key, locations, users, restaurants));
        },
        updateSearchValueEventHandler: (value) => {
            dispatch(UsersActions.updateSearchValueAction(value));
        },
        suggestionsEventHandler: (auto, e) => {
            dispatch(UsersActions.suggestInUsersAction(auto ,e.query));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);