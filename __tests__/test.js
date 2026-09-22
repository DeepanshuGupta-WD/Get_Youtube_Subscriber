const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;

const app = require('../src/app');
const Subscriber = require('../src/models/subscribers');

chai.use(chaiHttp);

// This test file connects to the same local database the app uses.
// It expects `node src/createDatabase.js` to have been run already,
// so there is at least one subscriber to test against.
const DATABASE_URL = 'mongodb://localhost/subscribers';

describe('Subscribers API', () => {
  let sampleId;

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
    const first = await Subscriber.findOne();
    if (first) sampleId = first._id.toString();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  describe('GET /subscribers', () => {
    it('responds with 200 and an array of subscribers', async () => {
      const res = await chai.request(app).get('/subscribers');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('subscribedChannel');
    });
  });

  describe('GET /subscribers/names', () => {
    it('responds with 200 and objects containing only name and subscribedChannel', async () => {
      const res = await chai.request(app).get('/subscribers/names');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);

      const entry = res.body[0];
      expect(entry).to.have.property('name');
      expect(entry).to.have.property('subscribedChannel');
      expect(entry).to.not.have.property('_id');
      expect(entry).to.not.have.property('subscribedDate');
    });
  });

  describe('GET /subscribers/:id', () => {
    it('responds with 200 and the matching subscriber for a valid id', async () => {
      expect(sampleId, 'no subscriber found - run node src/createDatabase.js first').to.exist;
      const res = await chai.request(app).get(`/subscribers/${sampleId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('_id', sampleId);
      expect(res.body).to.have.property('name');
    });

    it('responds with 400 and a message when the id does not match', async () => {
      const res = await chai.request(app).get('/subscribers/123');
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message');
    });
  });
});