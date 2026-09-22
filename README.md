# GetYouTube Subscribers

A small Node.js and MongoDB application that stores YouTube subscribers and serves them as JSON, along with a responsive front-end website to browse and test the API.

## Overview

This project demonstrates basic CRUD-style operations (read, in this case) using **MongoDB** with **Mongoose** in a **Node.js + Express** server. It stores subscriber records and exposes them through a small REST API, with a front-end that lets you try each endpoint directly from the browser.

## Features

- Express server that connects to a local (or cloud) MongoDB database
- Three REST API endpoints to read subscriber data
- Proper error handling with correct HTTP status codes
- A responsive, attractive website (`public/index.html`) with:
  - A live "Try the API" console to send requests and see responses
  - A searchable list of all subscribers
  - Setup guidelines and endpoint documentation
- Automated tests written with Mocha, Chai, and Chai-HTTP

## Project structure

```
├── public/
│   └── index.html            # Front-end website
├── src/
│   ├── app.js                # Express routes — handles requests and responses only
│   ├── index.js               # Connects to MongoDB and starts the server
│   ├── createDatabase.js      # Seeds the local database with sample subscribers
│   ├── data.js                # Sample subscriber data used by createDatabase.js
│   └── models/
│       └── subscribers.js     # Mongoose schema for a subscriber
├── __tests__/
│   └── test.js                # Mocha/Chai tests for the API
├── package.json
└── README.md
```

## Tech stack

- **Node.js** + **Express** — server and routing
- **MongoDB** + **Mongoose** — database and schema modeling
- **Mocha**, **Chai**, **Chai-HTTP** — testing
- **HTML/CSS/JavaScript** — front-end website (no framework, fully self-contained)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/DeepanshuGupta-WD/Get_Youtube_Subscriber.git
   cd Get_Youtube_Subscriber
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Seed the database with sample subscribers (run once):
   ```
   node src/createDatabase.js
   ```

4. Start the server:
   ```
   npm start
   ```

5. Open the website:
   ```
   http://localhost:3000
   ```

### Running tests

```
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| `GET` | `/subscribers` | Returns an array of all subscribers |
| `GET` | `/subscribers/names` | Returns an array of subscribers with only `name` and `subscribedChannel` fields |
| `GET` | `/subscribers/:id` | Returns a single subscriber by ID. Returns status `400` with `{ message: error.message }` if the ID does not match |

## Environment variables (for deployment)

The app falls back to sensible local defaults, so no configuration is required to run it locally. For deployment, these optional environment variables can be set:

| Variable | Purpose | Default |
|-----------|----------|----------|
| `DATABASE_URL` | MongoDB connection string | `mongodb://localhost/subscribers` |
| `PORT` | Port the server listens on | `3000` |

## Guidelines followed

- `app.js` only handles requests and responses — it does not connect to the database or start the server.
- The database connection and server start-up live in `index.js`.
- `/subscribers/names` is defined above `/subscribers/:id` so that "names" is not mistakenly read as an ID.
- `src/models/subscribers.js`, `src/createDatabase.js`, and `src/index.js` were left unmodified, as required.

## License

ISC
