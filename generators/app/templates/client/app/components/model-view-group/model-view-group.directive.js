(function () {
  'use strict';

  // register the directive as modelViewGroup
  angular
    .module('<%= scriptAppName %>')
    .directive('modelViewGroup', modelViewGroup);

  // add modelViewGroup dependencies to inject
  modelViewGroup.$inject = ['$rootScope', 'ModelDefinitions', '$state'];

  /**
   * modelViewGroup directive
   */
  function modelViewGroup($rootScope, ModelDefinitions, $state) {
    // directive definition members
    var directive = {
      scope: {
        propDefinitions: '=definitions',
        viewModel: '=model',
        type: '@',
        iconProp: '=?',
        template: '=?',
        narrowMode: '=?'
      },
      link: link,
      templateUrl: function(element, attrs) {
        if (attrs.template) return attrs.template;

        var types = ['detail', 'items-content', 'items-header'];
        if (types.indexOf(attrs.type) === -1) {
          throw new Error('ModelViewGroup: type should be one of ' + types.join(','));
        }
        return 'app/components/model-view-group/' + attrs.type + '.html';
      },
      replace: true,
      restrict: 'EA'
    };

    return directive;

    // directives link definition
    function link(scope, element, attrs) {
      scope.showProp = showProp;
      scope.display = ModelDefinitions.display;

      function showProp(propDef) {
        return !scope.narrowMode || propDef.displayPriority !== 'low';
      }
    }
  }

})();
