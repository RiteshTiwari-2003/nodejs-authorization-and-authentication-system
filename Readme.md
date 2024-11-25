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
a schema is basically a formal description of how a database is formed and where is everything located
