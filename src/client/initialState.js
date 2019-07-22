const { List, Map } = require('immutable');

export default {
    app: Map({
        size: 200,
        isConnected: false,
        username: '',
        locations: [],
    }),
    topbar: Map({
        activeItem: 'home'
    }),
    registerPage: Map({
        username: '',
        password: '',
        isValidUsername: true,
        location: '',
        // locations: [],
        suggestions: [],
        picture: {
            pictureType: '',
            pictureData: [],
        },
    }),
    loginPage: Map({
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
    }),
    restaurants: Map({
        showRestaurantForm: false,
        restaurantName: '',
        restaurantLocation: '',
        review: '',
        isValid: false,
        suggestions: [],
        submitMessage: {
            succeed: false,
            message: '',
        },
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
    })
    // viewProfilePage: Map({
    //
    // }),
    // addReview: Map({
    //
    // }),
};
