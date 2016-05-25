'use strict';

describe('Directive: modelViewGroup', function () {

  // load the directive's module and view
  beforeEach(module('<%= scriptAppName %>'));
  beforeEach(module('app/components/model-view-group/model-view-group.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<model-view-group></model-view-group>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should set the element text', function () {
    element.text().should.equal('this is the modelViewGroup directive');
  });
});
