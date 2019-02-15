# API SHOP

#### Before Starting
The .sample-env file serves as a guide for developers to know which environment variables the project needs, and also works for setting default variables when possible.

Make sure you run setup.js to load local environment variables (node setup.js) and edit the .env file NOT the .sample-env.

The script simply copies the contents from the .sample-env and creates a new file called .env 
By default, the DotEnv library will look for the .env file to set the environment variables.

#### How it works


POST /login

```
Admin
username: faber
password: 123

No Admin
username: ivansan
password 321
```

Log in with your username and password and you will be given a token. You need to paste this token in the request header(x-api-token header) so that the system will know your privileges as a user.

Only Admins can create, update, delete and list other users. No Admins can do the same but just with customers. The customer has a reference to the user who created it and another reference to the last user who modified it. 

• Admin Endpoints

```
GET /users
POST /users
DELETE /users/id
UPDATE /users/id
PATCH /users/id
```

• User Endpoints

```
GET /customers
GET /customers/id
POST /customers
DELETE /customer/id
UPDATE /users/id
```

