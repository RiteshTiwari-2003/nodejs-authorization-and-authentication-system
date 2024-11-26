# authentication and authorization with role based access control using jwt token and mongo db

first we create a empty folder nodejs authentication and authorization and in terminal run the this syntex:
npm init for installation of package.json for node js

# now after installation of package.json we need to install other importent node packages

for this we again run the this syntex:

# npm install express nodemon and hit enter

# express js is nodejs framework which is used for building web application quickly and easily

# and nodemon is the tool that watch the file system and automatically restart the server when there is changes occur

you can see also these dependencies in package.json along with there version

# after this create a new file server.js for running the program on server

in which we import express and run the server on port 5000

....and for running the server.js we add two script in package.json like:
"start":"node server.js",
"dev":"nodemon server.js"

# after doing all thing in server.js we need to install dotenv using this syntex

like npm i dotenv
after this we create one more file .env file:
in which we can store or pass all envoirment variable in all the project

# after this for mongodb connection we first install mongoose

syntex:
npm i mongoose

# create a config folder in the main file and in this folder create file of database.js

in database.js we first import mongoose and also import dotenv for accessing envoirment variable from .env file,
make a async function connectDB a async arrow function in which we call mongodb is connected on console

# difference between database and schema

database is any collection of data , a data in a database is usually organized in such a way that the information is easily accessible.
a schema is basically a formal description of how a database is formed and where is everything located.

# how to use mongodb?

go in mongodb atlas click on signin click on build a database , then you need to create a cluster ,
you can name it anything, and then click on create cluster , you can create username and password for a database.
after that you create your own user.
for local envoirment use your own ip address
go to the database , click on connect ,go to mongodb driver ,copy the url and paste that mongo_url in .env MONGO_URL variable
when you run the server problem occur in mongodb connection and error shown in new url path so we need to remove key newurlpath
newurlparser:true

save the file and you can see our mongodb is connected
now after connecting with mongodb we need to create user schema

# create user model

after successfully connection of mongodb you need to create user model or user schema
you need to create folder model and in that folder cretae a file User.js, first import our mongoose in user.js,
then create userschema using mongoose.Schema() method,
using Mongoose.model function we create a model in which we give two parameter one is model name in String and one is scema which is created in same file.

# crud operation

in backend i use postman for request response from server to client means for api request we use postman
in crud operation we basically perform these four operation (get,post,put,delete) cryd means create read update and delete
for giving value to the server we use post method and after this when we create some user
we use get method foe fetching reading the data, and if you update any id with given username then you can use put for updation and if you want to delete given id then you can use the delete command.

we import connectDB database from config database.js file in server.js

1. create user registration;
   for this we create Auth folder in which we create Auth.js file in whihc we import model User.js
   now we need to async express function that will take the user data and register in database, for that we need to go for server.js file and app.use(express.json()), save the file and again go to the auth file

and create register function in Auth.js
for accessing from other file we need to export this function using exports.register=async(req,res,next)=>{}
also in Auth we create Route.js
in Route.js
we import express
using
const express=require("express");
const router=express.Router();
also import regiter from Auth in this route , also we exports route from this file to other file
in server.js also we need to import route as a middleware
app.use('/api/auth',require("./Auth/Route"));

# postmen for crud operation request handling

like in postman we first create collection , you can name new collection anything as you want like(Nodejs Auth)
now in Nodejs Auth we click on 3 dot and click on add request
you can name the request as you want like user registration, press enter you can pass the url , in request dropdown you choose post request
in header we mention key as accept and value as a application/json ,
and our url path is http://localhost:5000/api/auth/register/, now in write field write username and password in a object and send the request.

# 2. create user login

now again go in post man for login user ,
now we need to create another request user login it will be post request and url is http://localhost:5000/api/auth/login/,
again in header we choose key as accept and value application/json, and in body section we cjhoose raw and json format choose in dropdown
now paste same method as you wrote in register then send the request then output come a object of object, in which one key value is login is successfull

also we update rthe user with the help of postman and delete the user

# and i create the vies folder for frontend based wrok for displaying all the register login and admin page

for this we use ejs extention ejs means ecma javascript engine

# i use jwt token for authentication

import jwt from "jsonwebtoken"

# and also install cookie-parser for

cookie parser generally used for managing the cookies sent byt the client to the server.
1.parse cookies from http request:
cookies are included in the cookie header of incoming http request.
the cookie-parser middleware parses this header and makes the cookies available inn req.cookies as a javascript object.

# 3. secure token for authorization

in authentication workflow , cookies might store sensitive token like:
jwt (json web token )
session IDs

. cookie-parser helps in securly reading these cookies and validating them during the authentication process.

# all the data registered data show on the mongodb when i register the data

when on registration page (localhost:5000/register when i put the username and password and click on register then all the registered value stored in mongodb)
this is checked by when i come on mongodb atlas and click on build configuration then we go on test and click on user
and we can see that all the registered data stored in object form in which keys are username in string format and password in encrypted format in string
and role which is assigned to that user

these are all registed data

\_id:ObjectId('674441076efb1955f3184e85')
username :"ritesh1"
password: "$2a$10$76zgI15uZPkhjJl.Y84Q.eZuTSVOuvAnD6yfcWqXtdH3NDgvJhgyW"
role: "Basic"
\_\_v:0

\_id:ObjectId('67444bb24cb45fe171272410')
username: "ritesh12"
password:"$2a$10$vgH/SN3jw5iuZswAnVKR9OFu6Cfn9MzvgpyW4oq2rmcry8WgrJlUC"
role:"Basic"
\_\_v:0

\_id:Objectid('6744ad89f16dcbab85d11c14')
username:"ritesh123"
password:"$2a$10$viT/M32zBSQx/YdJ6isJAe87YOc0IuJxS7hOScOoqgam1f.YvC/36"
role:"Basic"
\_\_v:0

\_id:ObjectId('6744ae2df16dcbab85d11c16')
username:"ritesh1234"
password:"$2a$10$DsVNK7yUPtJPwSZzD8FMvuaXpPsASCJw1dPhmR8HSYdAs416.06S2"
role:"Basic"
\_\_v:0

\_id:ObjectId('6744c2ffa794605cdc44880d')
username:"sfdfftyghyb"
password:"$2a$10$fxcelcXG4ogftUc14FjWM.DgcyRLdbF9Hya2m3AIJ.H6VtERQ6eLa"
role:"Basic"
\_\_v:0
