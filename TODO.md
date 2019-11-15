## TODO

> will most likely change as I work

- Client

  - **Setup**

    - ~~install Webpack and React~~
    - ~~install ESLint with Airbnb~~
    - ~~install React router~~
    - ~~install Redux~~

  - **Components**

    - ~~create Navbar component~~
    - ~~create Footer component~~
    - ~~create Login component~~
    - ~~create Signup component~~
    - ~~create Dashboard component~~
    - ~~create Board component~~
    - ~~create List component~~
    - ~~create Card component~~

  - **Router**

  - ~~if the user isn't logged in, redirect to the 'Login'~~

    - ~~when the user clicks 'Login' it should load the 'Login' component.~~
      - ~~when the user is logged in they should be redirected to their 'Dashboard'~~
    - ~~when the user clicks 'Signup' it should load the 'Signup' component.~~
      - ~~after the user signs up they should be redirected to their 'Dashboard'~~

  - **Redux**
    - ~~async actions using redux-thunk or redux-saga~~
    - ~~isUserLoggedIn - boolean~~
    - ~~users boards~~
    - ~~users lists~~
    - ~~users cards~~

- Server

  - **Setup**

    - ~~install up express~~
    - ~~install volleyball for logging~~
    - ~~install cors( not sure if I'll need it as I plan to deploy to the same server)~~
    - ~~install sequelize/pg pg-hstore to communicate with PostgreSQL~~
    - ~~install ESLint with Airbnb~~
    - ~~install joi for validate with out db models~~
    - ~~install bcrypt to hash password before inserting in db.~~
    - ~~install jsonwebtoken for authentication/authorization~~

  - **Models**

    > sequelize adds id(primary key), createdAt, and updatedAt fields

    - ~~_users_~~

      - ~~attributes: email(string), username(string), password(string)~~
        - ~~unique contraints on email and username~~
        - ~~all are required~~
      - ~~hasMany boards~~

    - ~~_boards_~~

      - ~~attributes: title(string), background(string), ownerId(integer)~~
        - ~~title and ownerId are required~~
        - ~~background default value is '#ffffff'~~
      - ~~hasMany lists~~
      - ~~belongsTo user~~

    - ~~_lists_~~

      - ~~attributes: title(string), order(integer), archived(boolean), boardId(integer)~~
        - ~~title, order and boardId are required~~
        - ~~archived default value is 'false'~~
      - ~~hasMany cards~~
      - ~~belongsTo board~~

    - ~~_cards_~~
      - ~~attributes: title, order, archived, listId~~
        - ~~title, order, listId are required~~
        - ~~archived default value is 'false'~~
      - ~~belongsTo list~~

  - **Routers**

    - ~~_/users_~~

      - ~~DELETE~~
        - ~~/:userId~~
          - ~~remove the user with the id from the db~~
          - ~~protected route. user needs authorization~~

    - ~~_/boards_~~


      - ~~POST~~

        - ~~create a board associated with a user~~

      - ~~PUT~~
        - ~~/:boardId~~
          - ~~modify the board~~
          - ~~protected route. user needs authorization~~

    - ~~_/lists_~~

      - ~~POST~~
        - ~~create a list associated with a board~~
      - ~~PUT~~
        - ~~/:listId~~
          - ~~modify a board with :id in the db~~
          - ~~protected route. user needs authorization~~

    - ~~_/cards_~~

      - ~~POST~~
        - ~~create a card associatad with a list~~
      - ~~PUT~~
        - ~~/:cardId~~
          - ~~modify the list with :id~~
          - ~~protected route. user needs authorization~~

    - ~~_/auth_~~
      - ~~POST~~
        - ~~/signup~~
        - ~~/login~~

      - logout with be handled on the client since it will remove the jwt from localStorage

## Entity-Relationship Diagram

![erd](./orgello-erd.png)
