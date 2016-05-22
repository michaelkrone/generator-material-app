'use strict';

describe('Factory: ModelDefinitions', function () {

  // load the resource's module
  beforeEach(module('<%= scriptAppName %>'));

  // instantiate service
  var resource;

  beforeEach(inject(function (_ModelDefinitions_) {
    resource = _ModelDefinitions_;
  }));

  it('should be defined', function () {
    Should.exist(resource);
  });

  it('should be a resource object', function () {
    resource.doSomething().should.equal('model-definitions');
  });

});
