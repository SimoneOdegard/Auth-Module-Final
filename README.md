# ![cf](https://i.imgur.com/7v5ASc8.png) Lab 09: Auth-Module

![example workflow](https://github.com/SimoneOdegard/Auth-Module-Final/actions/workflows/javascript.js.yml/badge.svg)

[GitHub](https://github.com/SimoneOdegard/Auth-Module-Final)

[Heroku](https://auth-module-final-teamsecy.herokuapp.com/)

## Collaborators

Chris Gantt, Elijah Prom, Simone Odegard, Yuliya Barysevich

---

## Overview

This App is a back end API that connects to the [front end](https://github.com/ganttArt/Auth-Module-Final-FrontEnd). The back end allows a user to Sign up, sign in, create, update and delete based on the users authorization level. The four levels are regular, writer, editor, and admin user.

---

## Configuration

Configure the root of your repository with the following files and directories. Thoughfully name and organize any aditional configuration or module files.

-   **README.md** - contains documentation
-   **.env** - contains env variables (should be git ignored)
-   **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file
-   **.eslintrc** - contains the course linter configuratoin
-   **.eslintignore** - contains the course linter ignore configuration
-   **.node.yml** - contains the course linter ignore configuration
-   **package.json** - contains npm package config
    -   create a `lint` script for running eslint (eslint \*_/_.js)
    -   create a `test` script for running tests
    -   create a `start` script for running your server
-   **index.js** - the entry point for your application
-   **src/** - contains your core application files and folders
-   **\_\_test\_\_/** - contains unit tests

---

## Authrization

-   Regular users - READ

-   writers - READ/CREATE

-   Editors - READ/CREATE/UPDATE

-   Administators - READ/CREATE/UPDATE/DELETE

---

## Dependencies

-   @code-fellows/supergoose version

-   base-64

-   bcrypt

-   cors

-   dotenv

-   express

-   jest

-   jsonwebtoken

-   mongoose

-   supertest

-   morgan

---

## Data Models

This api supports a mongoose 'user' model that is represented by the following:

```
const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});
```

---

## Sever End Points

-   POST `/signup`

```
{"username": "Brian", "email": "BikeChamp88@gmail.com", "password": "123456"}
```

-   POST `/signin`

To sign in youd put the same as sign up, or you can use a token such as

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMTg0ZDhmOGRkOWYwZDhlOTk2MmVjMSIsImlhdCI6MTUyODMxOTM3NX0.Pzg_k06Z7wGMi83g4QCM4Nr4AAYy8pinQqlfwj-mFEg
```

If your token is invalid you will recieve

```
{
    "error": "Invalid token"
}
```

-   GET `/users`

This route will show you a list of all the users. you can grab a specific user using `_id`

```
[
    {
    "users": [
        "5b1851d362f85dd94bcc91fa"
    ],
    "_id": "5b184d8f8dd9f0d8e9962ec1",
    "username": "Brian",
    "email": "BikeChamp88@gmail.com",
    "password": "$2b$10$gFCcQQPlEMLJg8tfZirp0OFEg23I7sbMFh7V2F7TLTL6m75NolU06",
    "__v": 0
    }
]
```

-   DELETE `/users/:id`

This route is used to delete users in the database

.
