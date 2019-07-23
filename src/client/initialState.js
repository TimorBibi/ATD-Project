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
    }),
    topbar: Map({
        activeItem: 'home'
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
        showReviews: Map({
            selectedRest: '',
            visible: false,
        }),
        editReview: Map({
            selectedReview: '',
            edit: false,
        }),
    }),
    addReview :Map({
        restaurantName: '',
        restaurantLocation: '',
        reviewText: '',
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
    })
    // viewProfilePage: Map({
    //
    // }),
    // addReview: Map({
    //
    // }),
};
