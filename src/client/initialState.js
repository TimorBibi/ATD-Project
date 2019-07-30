const { List, Map } = require('immutable');

export default {
    app: Map({
        size: 200,
        isConnected: false,
        username: '',
        users: List(),
        restaurants: List(),
        locations: [],
        addedUser: false,
        addedReview: false,
        activeItem: 'home'

    }),
    topbar: Map({
    }),
    registerPage: Map({
        username: '',
        password: '',
        isValidUsername: true,
        location: '',
        suggestions: [],
        picture: {
            pictureType: '',
            pictureData: [],
        },
        submitMessage: {
            succeed: false,
            message: '',
        },

    }),
    loginPage: Map({
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
        errorMessage: '',
    }),
    restaurants: Map({
        showRestaurantForm: false,
        searchNameValue: '',
        searchLocationValue:'',
        ratingRangeValues:[1,5],
        restaurantsToShow: List(),
        closerBetterValues:null,
        showOnlyReviewValue:'showOnlyReviewValue:all',
        criteriaReviewValue:'criteriaReviewValue:',
        sortReviewValue:'sortReviewValue:newFirst',
        ratingRangeReviewValues:[1,5],
        reviewsToShow: List(),
        showReviews: Map({
            selectedRest: '',
            visible: false,
        }),
        submitMessage: {
            succeed: false,
            message: '',
        },
    }),
    review: Map({

    }),
    users: Map({
        showRestaurantForm: false,
        searchKey: '',
        searchValue:'',
        usersToShow: List(),
        showReviews: Map({
            selectedUser: '',
            visible: false,
        }),
        editReview: Map({
            selectedReview: '',
            edit: false,
        }),
        movetoViewProfilePage: false,

    }),
    addReview :Map({
        restaurantName: '',
        restaurantLocation: '',
        // reviewText: '',
        suggestions: [],
        submitMessage: {
            succeed: false,
            message: '',
        },
        bathroomRate: 1,
        staffRate: 1,
        cleanRate: 1,
        foodRate: 1,
        driveInRate: 0,
        deliveryRate: 0,
        freeText: '',
        picture: {
            pictureType: '',
            pictureData: [],
        },
        isValid: false,
    }),
    viewProfilePage: Map({
        showRestaurantForm: false,
        editReview: Map({
            selectedReview: '',
            edit: false,
        }),
        bathroomRate: 1,
        staffRate: 1,
        cleanRate: 1,
        foodRate: 1,
        driveInRate: 0,
        deliveryRate: 0,
        avgRate: 0,
        freeText: '',
        picture: {
            pictureType: '',
            pictureData: [],
        },
        submitMessage: {
            succeed: false,
            message: '',
        },
        editProfile: false,
    }),
};
