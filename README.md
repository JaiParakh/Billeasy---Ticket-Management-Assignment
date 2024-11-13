# Nodejs/MongoDB Ticket Management Assignment

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT           | Express Server Port            | 3000      |
|MONGODB_URI           | MongoDB URI           | mongodb://localhost:27017/ticket-system      |
|JWT_SECRET           | JWT Secret Key          | edc5ba7147df1be5f84f77507f26004402d4b9317a5943c324f7db545083e167      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


# Getting started

- Install dependencies
```
npm install
```
- Build and run the project
```
nodemon
```
  Navigate to `http://localhost:3000`
```

## Project Structure
The folder structure of this app is explained below:

| **Name**                     | **Description**
| node_modules                 | Contains all npm dependencies
| src                          | Contains main source code
| config                       | Database Configuration 
| src/controllers              | Controllers define functions to serve various express routes
| src/middlewares              | Express middlewares which process the incoming requests before handling them down to the routes
| src/routes                   | Contain all express routes, separated by module/area of application         
| src/models                   | Models define schemas that will be used in storing and retrieving data from Application database
| src/services/analytics       | Analytics Logic
| src/index.js                 | Entry point to express app
| package.json                 | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)

