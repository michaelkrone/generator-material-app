'use strict';

describe('Factory: DateInterceptor', function () {

  // load the resource's module
  beforeEach(module('balanarApp'));

  // instantiate service
  var resource;

  beforeEach(inject(function (_DateInterceptor_) {
    resource = _DateInterceptor_;
  }));

  it('should be defined', function () {
    Should.exist(resource);
  });

  it('should be a resource object', function () {
    resource.doSomething().should.equal('date-interceptor');
  });

});
