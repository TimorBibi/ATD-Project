const { List, Map } = require('immutable');

export default {
    gallery: Map({
        images: List(),
        openLightBox: false,
        activeImage: 0,
        activeFilter: List(),
        galleryWidth: 0
    }),
    app: Map({
        size: 200,
        isConnected: false,
        tag: 'art',
        tags: List(),
        user: {
            username: '',
            location: {
                city: '',
                x: 0,
                y: 0
            },
            picture: {
                pictureType: '',
                pictureData: [],
            },
        }
    }),
    reviewform: Map({
        name: 'rest',
    }),
    topbar: Map({
        activeItem: 'home'
    }),
    registerPage: Map({
        username: '',
        isValidUsername: true,
        location: '',
        locations: [],
        suggestions: [],
        picture: {
            pictureType: '',
            pictureData: [],
        },
        done: false,
    })
};
