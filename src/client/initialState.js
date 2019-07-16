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
    }),
    reviewform: Map({
        name: 'rest',
    }),
    topbar: Map({
        activeItem: 'home',
    })
};
