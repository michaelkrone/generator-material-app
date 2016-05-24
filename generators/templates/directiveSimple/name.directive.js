(function () {
  'use strict';

  // register the service as <%= cameledName %>
  angular
    .module('<%= scriptAppName %>')
    .directive('<%= _.camelize(name) %>', <%= cameledName %>);

  // add <%= cameledName %> dependencies to inject
  // <%= cameledName %>.$inject = [''];

  /**
   * <%= cameledName %> directive
   */
  function <%= cameledName %>() {
    // directive definition members
    var directive = {
      link: link,
      restrict: 'EA'
    };

    return directive;

    // directives link definition
    function link(scope, element, attrs) {
      element.text('this is the <%= cameledName %> directive');
    }
  }

})();
