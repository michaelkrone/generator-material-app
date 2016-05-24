'use strict';

describe('Directive: modelInputGroup', function () {

  // load the directive's module and view
  beforeEach(module('<%= scriptAppName %>'));
  beforeEach(module('app/components/model-input-group/model-input-group.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<model-input-group></model-input-group>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should set the element text', function () {
    element.text().should.equal('this is the modelInputGroup directive');
  });
});
