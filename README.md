# backend

Organizer Login/Register endpoints
----------------------------------
API hosted at: https://bw-potluck-planner-tt50.herokuapp.com
### User Endpoints 
| Method | Endpoint           | Description                                 |
| ------ | ------------------ | --------------------------------------------|
| POST   | /api/auth/register | Allows organizers to register an account    |
| POST   | /api/auth/login    | Allows organizer to login to their account  |

Event CRUD
------------------------
API hosted at: https://bw-potluck-planner-tt50.herokuapp.com
### Event Endpoints 
| Method | Endpoint           | Description                                 |
| ------ | ------------------ | --------------------------------------------|
| GET    | /api/events        | Get all of the organizer's events           |
| GET    | /api/events/:id    | Get the event by the event id               |
| POST   | /api/events        | Add a new event                             |
| PUT    | /api/events/:id    | Update an event by id                       |
| DELETE | /api/events/:id    | Delete an event                             |

Food Add/Delete
------------------------
API hosted at: https://bw-potluck-planner-tt50.herokuapp.com
### Food Endpoints 
| Method | Endpoint               | Description                                 |
| ------ | ---------------------- | --------------------------------------------|
| GET    | /api/events/:id/food   | Get all of the event's food                 |
| POST   | /api/events/:id/food   | Add a new food to the event                 |
| GET    | /api/events/food/:id   | Get food by id                              |
| DELETE | /api/events/food/:id   | Delete food                                 |

Guest List Add/Delete
------------------------
API hosted at: https://bw-potluck-planner-tt50.herokuapp.com
### Guest List Endpoints 
| Method | Endpoint                     | Description                                 |
| ------ | ---------------------------  | --------------------------------------------|
| GET    | /api/events/:id/guest-list   | Get all of the event's guest list           |
| POST   | /api/events/:id/guest-list   | Add a new guest to the event                |
| GET    | /api/events/guest-list/:id   | Get guest by id                             |
| DELETE | /api/events/guest-list/:id   | Delete guest                                |

Guest Login 
----------------------------------
API hosted at: https://bw-potluck-planner-tt50.herokuapp.com
### Guest Login/Referral Code Endpoints 
| Method | Endpoint              | Description                                 |
| ------ | --------------------- | --------------------------------------------|
| POST   | /api/auth-guest/login | Allows organizer to login to their account  |
