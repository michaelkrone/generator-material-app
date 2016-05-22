'use strict';

describe('Directive: modelInput', function () {

  // load the directive's module and view
  beforeEach(module('<%= scriptAppName %>'));
  beforeEach(module('app/components/model-input-group/model-input/model-input.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<model-input></model-input>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should set the element text', function () {
    element.text().should.equal('this is the modelInput directive');
  });
});
