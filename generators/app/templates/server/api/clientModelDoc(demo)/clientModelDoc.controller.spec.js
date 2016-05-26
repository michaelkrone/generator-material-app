/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var clientModelDocModel = require('./clientModelDoc.model');

// Clear all clientModelDocs
function cleanup(done) {
  clientModelDocModel.model.remove().exec().then(function () { done();  });
}

describe('/api/client-model-docs', function () {

  var clientModelDoc;

  // reset clientModelDoc before each test
  beforeEach(function () {
    clientModelDoc = {
      name: 'Dog',
      info: 'Hello, this is dog.',
      active: true
    };
  });

  // Clear clientModelDocs before each test
  beforeEach(cleanup);

  // Clear clientModelDocs after each test
  afterEach(cleanup);

  describe('GET', function () {

    it('should respond with JSON array', function (done) {
      request(app)
        .get('/api/client-model-docs')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it('should respond with an error for a malformed clientModelDoc id parameter', function (done) {
      request(app)
        .get('/api/client-model-docs/malformedid')
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should respond with an not found error for a not existing clientModelDoc id', function (done) {
      request(app)
        .get('/api/client-model-docs/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should return a clientModelDoc for its id', function (done) {
      clientModelDocModel.model(clientModelDoc).save(function (err, doc) {
        request(app)
          .get('/api/client-model-docs/' + doc._id)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            res.body.should.be.an.Object.and.have.properties(clientModelDoc);
            res.body._id.should.exist;
            done();
          });
      });
    });

  });

  describe('POST', function () {

    it('should create a new clientModelDoc and respond with 201 and the created clientModelDoc', function (done) {
      request(app)
        .post('/api/client-model-docs')
        .set('Accept', 'application/json')
        .send(clientModelDoc)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.Object.and.have.properties(clientModelDoc);
          res.body._id.should.exist;
          done();
        });
    });

  });

  describe('PUT', function () {

    it('should return an error if attempting a put without an id', function (done) {
      request(app)
        .put('/api/client-model-docs')
        .set('Accept', 'application/json')
        .send(clientModelDoc)
        .expect(404)
        .end(done);
    });

    it('should respond with an not found error for a not existing clientModelDoc id', function (done) {
      request(app)
        .put('/api/client-model-docs/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should update a clientModelDoc and respond with the updated clientModelDoc', function (done) {
      request(app)
        .post('/api/client-model-docs')
        .set('Accept', 'application/json')
        .send(clientModelDoc)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          clientModelDoc.name = 'Cat';
          // check if id is stripped on update
          clientModelDoc._id = 'malformed id string';
          request(app)
            .put('/api/client-model-docs/' + res.body._id)
            .set('Accept', 'application/json')
            .send(clientModelDoc)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) {
                return done(err);
              }
              res.body.should.be.an.Object.and.have.property('name', clientModelDoc.name);
              done();
            });
        });
    });

  });

  describe('DELETE', function () {

    it('should return an error if attempting a delete without an id', function (done) {
      request(app)
        .delete('/api/client-model-docs')
        .set('Accept', 'application/json')
        .expect(404)
        .end(done);
    });

    it('should respond with an not found error for a not existing clientModelDoc id', function (done) {
      request(app)
        .delete('/api/client-model-docs/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should delete a clientModelDoc and respond with 204', function (done) {
      request(app)
        .post('/api/client-model-docs')
        .set('Accept', 'application/json')
        .send(clientModelDoc)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          request(app)
            .delete('/api/client-model-docs/' + res.body._id)
            .set('Accept', 'application/json')
            .expect(204)
            .end(done);
        });
    });
  });
});
