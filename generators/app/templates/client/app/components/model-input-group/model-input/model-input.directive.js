(function () {
  'use strict';

  // register the directive as modelInput
  angular
    .module('<%= scriptAppName %>')
    .directive('modelInput', modelInput);

  // add modelInput dependencies to inject
  // modelInput.$inject = [''];

  /**
   * modelInput directive
   */
  function modelInput() {
    // directive definition members
    var directive = {
      link: link,
      templateUrl: 'app/components/model-input-group/model-input/model-input.html',
      restrict: 'EA'
    };

    return directive;

    // directives link definition
    function link(scope, element, attrs) {
      element.text('this is the modelInput directive');
    }
  }

})();
