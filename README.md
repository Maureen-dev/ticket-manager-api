# Maintenance Tracker

Ticket Manager Api is an application that allows users to create ticket stories and assign them to an admin to either approve or reject


## Table of Content
 * [Getting Started](#getting-started)

 * [Prerequisites for installation](#Prerequisites)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [ API End Points Test Using Postman](#api-end-points)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
 * [Author](#author)

 * [License](#lincense)


## Getting Started


### Prerequisites for installation
1. Node js

2. Express

3. Git


### Installation
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/OKiMaureen/ticket-manager-api
```
2. Install dependencies 
```
e.g npm install.
```
3. Setup typeorm configurations
```
create a ormconfig.json file and copy contents from example.ormconfig.json into it. Modify the following in both development and test config to match your database configurations

a) type
b) port
c) username
d) database
```
3. Setup envconfigurations
```
create a .env file and copy contents from example.env into it. Modify the following as desired.
a) PORT
b) JWT_SECRET
```
4. Seed Admin into database by runniong the migration script.
```
e.g npm run migration
```

e.g npm start
5. Start the application by running the start script.

e.g npm start


5. Call all endpoints locally on port 8000.

### Test
run test using 'npm test'.

### API End Points

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/auth/signup</td>  <td>creates  a new user</td></tr>

<tr><td>POST</td> <td>/api/v1/auth/signin</td>  <td>logs in a user</td></tr>

<tr><td>POST</td> <td>/api/v1/stories/user</td> <td> Creates a user's story</td></tr>

<tr><td>GET</td> <td>/api/v1/stories/user</td>  <td>Gets all stories for a user</td></tr>

<tr><td>GET</td> <td>/api/v1/stories/user</td>  <td>Gets all user stories for an admin</td></tr>

<tr><td>POST</td> <td>/api/v1/story/:id/assign'</td> <td>Assign story to an admin</td></tr>

<tr><td>PUT</td> <td>/api/v1/story/:id/approve</td> <td>Approve a pending or disapproved story</td></tr>

<tr><td>PUT</td> <td>/api/v1/story/:id/reject</td> <td>Reject a pending or approved story</td></tr>
</table>

## Features

### Users
 * A users can create an account and log in.
 * A user can create a story.
 * A user can view all his/her storiess.


 ### Admin

 * An admin can view all stories on the application.
 * An admin can approve a story.
 * An admin can reject a story.    


## Built With

* NodeJs-EXPRESS

* TypeScript

* PostgreSql: It is used for the databse.

* Typeorm

* Mocha and Chai (for testing).

## Author
* Okafor Maureen

## Postman Documentation
 [![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/3216821/SzYT5MP5)

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

