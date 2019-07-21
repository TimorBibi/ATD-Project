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
        isValid: false,
        suggestions: [],
    }),
    // viewProfilePage: Map({
    //
    // }),
    // addReview: Map({
    //
    // }),
};
