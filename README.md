# Tasks Service Every Back-End
A REST API for tasks management.

[[_TOC_]]

# Installation
- Start docker on the host machine
- On the root folder run the following command to start the containers:
```
docker-compose up -d
```
- Log into the container:
```
docker exec -it ev_app bash
```
- Inside the container, on folder `/app` install dependencies:
```
npm install
```
- Now start the project:
```
npm start
```
- The endpoints should be available on host machine throug the host:
```
http://localhost:8300
```

# Software Requirement Specification

## Purpose
This projects intent to create a REST API to allow users to CRUD a list of personal tasks. Admin users should also be able to CRUD other users's tasks.

### Definitions
- CRUD: Create, Read, Updated and Delete some resource.

### Background
This project is part of screening process at a company.

### System overview
- Express: the framework to power the Node.js server application.
- TypeORM: the DB ORM.
- Typescript: the choosen language.
- Docker: the local development environment.
- AWS:
  - EC2: the instance running Linux OS and the server application.
  - ELB: Elastic Load Balancer to manage loads.
  - Auto Scaling: Horizontal scalation of resources according to load.
  - RDS MySQL: the db to store info.
  - API Gateway: manage http routes
  - CloudFront: perform caching of specific routes

### References
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/#/)

## Overall description
You will be creating an API for a task application.

1. This application will have tasks with four different states:
   - To do
   - In Progress
   - Done
   - Archived
2. Each task should contain: Title, Description, and what the current status is.
3. A task can be archived and moved between columns, or statuses.
4. The endpoint for tasks should only display tasks for those users who have authenticated and are authorized to view their tasks.

The Project will be a REST API application, using a database to store the users and taks. There will be basically thre sets of endpoints:
- User authentication endpoints (login/profile)
- Tasks endpoints: a regular user would only be able to CRUD on their owned tasks records
- Admin endpoints: and an admin would be able to CRUD all users and all user records.

It implements 2 roles with different permission levels: a regular user would only be able to CRUD on their owned records, and an admin would be able to CRUD all users and all user records.

### Product perspective
#### User interfaces
None. It is expected only HTTP endpoints to be available.

#### Communication Interfaces
The following HTTP endpoints will be available:

1. Authentication:
  - POST    /login: authenticate a user.

1. Users CRUD:
  - PUT     /profile: edit the current user.
  - GET     /profile: get current user data.
  - DELETE  /profile: delete current user.
  - POST    /users: create a new user on DB.
  - PUT     /users/:Id: edit a user by id. **Admin** only.
  - GET     /users/:Id: get a user by id. Get all if no id specified. **Admin** only.
  - DELETE  /users/:Id: delete a user by id. **Admin** only.

1. Tasks CRUD: 
  - POST    /tasks/: create a task object for current user.
  - GET     /tasks/: get the list of tasks for the current user.
  - GET     /tasks/:Id: get a specific task, validate the user.
  - PUT   /tasks/:Id: edit id task, validate the user.
  - DELETE  /tasks/:Id: delete task id, validate the user.
  - POST    /tasks/user/:user: create a tasks for a user. **Admin** only.

### Design constraints
#### Operations
- All operations should be authenticated, except for the login endpoint.
- There should be 2 roles of authorized access:
  - User: will be able to manage only its own task list.
  - Admin: will be able to manage any user task list.

## Specific requirements
### External interface requirements
- User: anyone willing to create a profile.
- Admin: curated list of users managed by the product owner.
- REST Client: some software capable of interacting with http endpoints (GET, POST, PUT, DELETE) such as Postman and cURL.

### Performance requirements
- HTTP endpoints must respond very quickly: response time < 1s.
