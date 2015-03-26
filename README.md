# generator-material-app

Yet another yeoman generator for scaffolding a simple MEAN stack application using some material design elements.

![User administration](https://michaelkrone.github.io/generator-material-app/screenshots/users-detail.png)

###### This project is still under heavy development.

## Features
The generator supports group based ACL's and socket.io communication with the server API.


## Install
```bash
$ npm install generator-material-app
```

## Quick Start
To quickly scaffold an application use the following commands (Answer all questions with hitting the enter key):
```bash
$ mkdir app && cd $_
$ yo material-app
$ gulp build
$ npm start
```
Will generate something like this:
![User creation](https://michaelkrone.github.io/generator-material-app/screenshots/users-create.png)
Create user dialog

Navigate to [http://localhost:9001](http://localhost:9001) to see the generated application where you can administer the users of your application

### Add API
This will add a server API and a corresponding client route to manage your cats including test stubs and documentation:
```bash
$ yo material-app:api cat
$ yo material-app:apiroute cat
$ gulp build
$ npm start
```

### Generate Documentation
The documentation is by now generated for server side code only:
```bash
gulp jsdoc
```

### Run Tests
For running the generated test start the following gulp tasks
```bash
gulp unit:server
gulp unit:client
```

## List of Generators
* Application scaffold
    - [`material-app`](#app) (alias for `material-app:app`) - The directory name will be used as the application name

* Server API
    - [`material-app:api`](#api) - Pass the name of the API items as an argument
    
* Client Generators
    - [`material-app:apiroute`](#apiroute) - Pass the name of the route as an argument
    - [`material-app:decorator`](#decorator) - Pass the name of the decorator as an argument
    - [`material-app:directive`](#directive) - Pass the name of the directive as an argument
    - [`material-app:route`](#route) - Pass the name of the route as an argument
    - [`material-app:controller`](#controller) - Pass the name of the controller as an argument
    - [`material-app:filter`](#filter) - Pass the name of the filter as an argument
    - [`material-app:service`](#service) - Pass the name of the service as an argument
    - [`material-app:provider`](#provider) - Pass the name of the provider as an argument
    - [`material-app:factory`](#factory) - Pass the name of the factory as an argument


## Purpose
This generator is suited for prototyping simple CRUD applications. The generated code is somehow following  [John Papa's Styleguide](https://github.com/johnpapa/angular-styleguide) for Angular applications. Every generator generates a test stub
for easily adding tests to your application. Note that there is not much material design in the layout yet, despite the use of 
the [Angular Material Design](https://material.angularjs.org/#) components.

## Used Technologies

 * Node.js
 * MongoDB
 * Express
 * mongoose
 * socket.io
 * Angular.js
 * ui.router
 * SASS
 * Gulp
 
## Screenshots
 
![User password](https://michaelkrone.github.io/generator-material-app/screenshots/users-password.png)
Set password dialog
