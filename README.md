# Support Desk

A small support ticket management app where a support team can create, view and update tickets.

### Tech used

* React + Vite
* Node.js + Express
* SQLite + Sequelize
* Joi for backend validation
* Mocha, Chai and Supertest for API tests

### Features

* Create support tickets
* Search and filter tickets
* Sort by newest or oldest
* Pagination
* View ticket details
* Update ticket status and priority
* Summary of ticket counts
* Basic loading, error and empty states
* Responsive UI

### Running locally

#### Backend

```bash
cd server
npm install
npm run seed
npm run dev
```

The API runs on `http://localhost:4000`.

#### Frontend

In another terminal:

```bash
cd client
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

If needed, the frontend API URL can be changed using `VITE_API_URL`.

### Tests

```bash
cd server
npm test
```

Tests use an in-memory database, so they don't affect the local database.

### Project structure

```text
server/
  src/
    controllers/
    models/
    routes/
    validation/
    app.js
    db.js
    server.js

  tests/

client/
  src/
    api/
    components/
    pages/
```

Authentication was left out since it was outside the scope of the assignment.
