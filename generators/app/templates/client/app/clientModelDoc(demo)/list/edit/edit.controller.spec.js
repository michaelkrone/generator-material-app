'use strict';

describe('Controller: ClientModelDocEditController', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>.clientModelDoc.edit'));

  var controller;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('ClientModelDocEditController', {
      // $scope: scope
    });
  }));

  it('object should exist', function () {
    Should.exist(controller);
    controller.should.be.an.instanceof(Object);
  });
});
