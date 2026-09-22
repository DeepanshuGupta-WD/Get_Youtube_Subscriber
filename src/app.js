// app.js only handles requests and responses.
// The database connection and server start-up live in src/index.js.

const express = require('express');
const path = require('path');
const Subscriber = require('./models/subscribers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serves the website in /public (index.html)
app.use(express.static(path.join(__dirname, '..', 'public')));

// GET /subscribers
// Responds with an array of all subscribers.
app.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /subscribers/names
// Responds with an array of objects that only have `name` and `subscribedChannel`.
// This route must stay above '/subscribers/:id', otherwise "names" is read as an id.
app.get('/subscribers/names', async (req, res) => {
  try {
    const subscribers = await Subscriber.find(
      {},
      { name: 1, subscribedChannel: 1, _id: 0 }
    );
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /subscribers/:id
// Responds with one subscriber, or 400 with { message } when the id does not match.
app.get('/subscribers/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);

    if (!subscriber) {
      return res
        .status(400)
        .json({ message: `No subscriber found with id ${req.params.id}` });
    }

    res.status(200).json(subscriber);
  } catch (error) {
    // An id that is not a valid ObjectId throws a CastError, handled here.
    res.status(400).json({ message: error.message });
  }
});

module.exports = app;