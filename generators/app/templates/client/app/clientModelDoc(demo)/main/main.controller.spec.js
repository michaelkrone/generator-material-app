'use strict';

describe('Controller: ClientModelDocMainController', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>.clientModelDoc.main'));

  var controller;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('ClientModelDocMainController', {
      // $scope: scope
    });
  }));

  it('object should exist', function () {
    Should.exist(controller);
    controller.should.be.an.instanceof(Object);
  });

});
