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
