'use strict';

describe('Controller: ClientModelDocItemsController', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>.clientModelDoc.items'));

  var controller;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('ClientModelDocItemsController', {
      // $scope: scope
    });
  }));

  it('object should exist', function () {
    Should.exist(controller);
    controller.should.be.an.instanceof(Object);
  });

});
