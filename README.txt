Hagar Livneh: 206012528
Timor Bibi : 2045949596


Design:
    There are 9 types of components in our implementation:

Main component:
1.App:
     a. Users and Restaurants arrays with the relevant properties
         fetched from the server with each change made on the server.
     b. Cities names list.
     c. Indicator of the connected user, if exist.
     d. Flags that indicate database changes have been made.
     e. BrowserRouter that sets the app body relevant component.

2.TopBar:
    The app menu, linked to BrowserRouter components at the App component
    and handel the navigation of the app.


Users components:
3. RegisterPage:
    Register user with: username, password, location and photo.
    username - must be uniq, having verification onBlur.
    password - any. saved on the database only.
    location - from specific list, includes: city name, altitude and latitude.

    After submission success, Restaurants component - the root components reloads.

4. LoginPage:
    User login page using: username and password.
    connect the user after compering the props with the database in the server,
    or sending error message to the user to handle.

    After login success, Restaurants component - the root components reloads.

5. Users:
    List of all the user registered to the app, sorted by the user query, chosen by search properties.
    One have the ability to view all the other users profiles, includes:
        a.Username.
        b.Location.
        c.Reviews list
    One have the ability to jump to "MyProfile" (next component) and edit his own reviews.
    Edited reviews sends to the server to update the database, then updates App relevant
    users and restaurants.

6. ViewProfilePage:
    MyProfile page shows the connected user profile properties and allows to edit them,
    including the user reviews for each restaurant.
    Edited properties and or reviews sends to the server to update the database,
    then updates App relevant users and restaurants.

Restaurants components:
7. Restaurants, includes:
    a. List of all the restaurants that were reviewed in the app, sorted by the user query,
        chosen by search properties.
    b. Connected users can use the Closer-Better bar that sort
        the list by the closest or best restaurants fits to the user location.
    c. The ability to edit the connected user reviews for each restaurant, as well as,
        view all the other reviews.
    d. Add new review to the app by using "AddReview" component.

8. AddReview:
    Connected user can add new review to the app.
    If the restaurant name and location chosen by the user exists, the review adds to the
    restaurant reviews list.
    Else, the app creates new restaurant with the name and location entered by the user
    and reviews list with the new review written by the user.

9. Review:
    By default, show specific review properties that passed from the restaurant owns it.
    By onClick button, replace the props view with editable inputs, one for each property.
    Review properties:
        a. Restaurant name - not editable.
        b. Restaurant location - not editable.
        c. Bathroom Rate - editable.
        d. Staff Rate - editable.
        e. Clean Rate - editable.
        f. Food Rate - editable.
        g. Drive In Rate - editable.
        h. Delivery Rate - editable.
        i. Review Text - editable.
        j. Picture - editable.

Submit new Review flow:
    1. Check if the user connected, if it is, the user allowed to add new review.
    2. The user fill in all the review properties he wants.
        For each input the user change, onChange event sends to the "updateFieldEventHandler",
        then, an Action sends to the reducer to to change the relevant state of the component at the store.
    3. By pushing "Submit" button, onSubmit event sends to the event handler with all the inputs values.
    4. The event handler sends the relevant Action:
        a. MissingFields Action - sends to the reducer with error message of the missing fields,
            then, the reducer set the message to the component state for showing the user,
            and then returns to 2.
        b. Submit Review - sends all the review fields values in the action payload to the saga to catch
            after the necessary fields validation.
    5. AddReview Saga caches the submitting action and sends async  request includes the action payload
        to the server for submitting the review to the database, and expecting the request result from the server.
    6. The server creates new reviewScheme with all the review fields, then the server find the relevant
        restaurant and the review writer user, and update the review within them.
    7. If succeeded, the server sends the updated users and restaurants lists back to the client Saga.
       Else, the server send back the error message, and log it.
    8. The AddReview Saga then, send actions to the App reducer ,Addreviews reducer and Restaurants reducer,
        for updating the user and restaurants list at the App State and notify the Addreviews and Restaurants
        about the changes.
    9. Finally, the App State Changes calls for the App reducer who holds all the other components within him,
        which then, rendering the all App according to the modifications made.


Features implemented:
    All the application core features mentioned at the assignment file have been implemented
    using Semantic-ui-react and Prime-react libraries.
    User connection sessions implemented by using cookies allowing login/ logout from the App.

Mongoose Models:
    1. CitiesModel - cities: [{
                            city: String,
                            x: Number,
                            y: Number
                        }]

    2. RestaurantModel - name: String,
                         location: {city: String, x: Number, y: Number},
                         reviews: [ReviewModel],
                         avgRate: Number

    3. UserModel - username: String,
                   password: String,
                   location: {city: String, x: Number, y: Number},
                   picture: {data: String, contentType: String},
                   reviews: [ReviewModel],

    4. ReviewModel -  username: String,
                      name: String,
                      location: {city: String, x: Number, y: Number},
                      bathroom: Number,
                      staff: Number,
                      clean: Number,
                      food: Number,
                      driveIn: Number,
                      delivery: Number,
                      freeText: String,
                      picture: {data: String, contentType: String },
                      timeStamp: String,
                      avgRate: Number,

Extra libraries:
    Semantic-ui React.
    PrimeReact.
    React-router-dom - for Router.
    Font Awesome - uniq icons.
    jsonwebtoken - for cookies tokens.