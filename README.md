# Orgello

**Trello clone**

## The Plan

_React/Redux on the client and Express API using PostgreSQL on the server_

## TODO

_will most likely change as I work_

- Client

  - **Setup**

    - ~~install Webpack and React~~
    - ~~install ESLint with Airbnb~~
    - install React Router
    - install Redux

  - **Components**

    - create LandingPage component
    - create Navbar component
    - create Footer component
    - create Login component
    - create Signup component
    - create Dashboard component
    - create Board component
    - create List component
    - create Card component

  - **Router**

    - if the user isn't logged in, then the only page they can access is the landing page.
      - landing page should convince the user to sign up.
    - when the user clicks 'Login' it should load the 'Login' component.
      - when the user is logged in they should be redirected to their 'Dashboard'
    - when the user clicks 'Signup' it should load the 'Signup' component.
      - after the user signs up they should be redirected to their 'Dashboard'

  - **Redux**
    - async actions using redux-thunk or redux-saga
    - isUserLoggedIn - boolean
    - users boards
    - users lists
    - users cards

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

    - sequelize adds id(primary key), createdAt, and updatedAt fields

    - _users_

      - attributes: username, mail, hashPassword, boardId
      - has many boards

    - _boards_

      - attriutes: title, listId(foreign key), cardId(foreign key)
      - belongs to a user
      - has many lists
      - has many cards

    - _lists_

      - attributes: title cardId(foreign key),
      - has many cards

    - _cards_
      - attributes: content, listId(foreign key)
        belongs to lists

  - **Routers**

    - /users

      - POST
        - create a user and add it to the db.
      - GET
        - /users/:id - get a single user.
        - protected route. user needs authorization
