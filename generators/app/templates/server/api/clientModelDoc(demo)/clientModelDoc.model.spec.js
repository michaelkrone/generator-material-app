/* jshint unused:false */
'use strict';

var should = require('should');

var clientModelDoc = require('./clientModelDoc.model');
var clientModelDocDefinition = clientModelDoc.definition;
var clientModelDocSchema= clientModelDoc.schema;
var ClientModelDoc = clientModelDoc.model;

var clientModelDocData = [
  {
    name: 'Dog',
    info: 'Hello, this is dog.',
    active: true
  }, {
    name: 'Bugs Bunny',
    info: 'Famous Bunny.',
    active: true
  }, {
    name: 'Nyan Cat',
    info: 'No comment.',
    active: false
  }
];

// Clear all clientModelDocs
function cleanup(done) {
  ClientModelDoc.remove().exec().then(function () { done();  });
}

describe('ClientModelDoc Model', function () {

  // Clear clientModelDocs before testing
  before(cleanup);

  // Clear clientModelDocs after testing
  after(cleanup);

// Check test conditions for clientModelDoc tests
  it('should start with no clientModelDocs', function (done) {
    ClientModelDoc.find({}, function (err, clientModelDocs) {
      clientModelDocs.should.have.length(0);
      done(err);
    });
  });

  describe('basic crud operations', function () {

    var clientModelDocModel = new ClientModelDoc(clientModelDocData[0]);

    // Clear clientModelDocs after running this suite
    after(cleanup);

    it('should insert a new clientModelDoc', function (done) {
      clientModelDocModel.save(function (err, clientModelDoc) {
        clientModelDoc.should.have.properties(clientModelDocModel);
        done(err);
      });
    });

    it('should insert a list of clientModelDocs', function (done) {
      ClientModelDoc.create(clientModelDocData, function (err, clientModelDoc) {
        // slice err argument
        Array.prototype.slice.call(arguments, 1)
          .should.have.lengthOf(clientModelDocData.length);
        done(err);
      });
    });


    it('should find a clientModelDoc by _id property', function (done) {
      ClientModelDoc.findById(clientModelDocModel._id, function (err, clientModelDoc) {
        clientModelDoc.should.have.properties(clientModelDocData[0]);
        done(err);
      });
    });

    it('should update a clientModelDoc', function (done) {
      clientModelDocModel.name = 'foo';
      clientModelDocModel.save(function (err) { done(err);  });
    });

    it('should remove a clientModelDoc', function (done) {
      clientModelDocModel.remove(function (err) { done(err); });
    });
  }); // crud
});
