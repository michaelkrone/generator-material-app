(function () {
  'use strict';

  // register the directive as <%= cameledName %>
  angular
    .module('<%= scriptAppName %>')
    .directive('<%= cameledName %>', <%= cameledName %>);

  // add <%= cameledName %> dependencies to inject
  // <%= cameledName %>.$inject = [''];

  /**
   * <%= cameledName %> directive
   */
  function <%= cameledName %>() {
    // directive definition members
    var directive = {
      link: link,
      templateUrl: '<%= htmlUrl %>',
      restrict: 'EA'
    };

    return directive;

    // directives link definition
    function link(scope, element, attrs) {
      element.text('this is the <%= cameledName%> directive');
    }
  }

})();
