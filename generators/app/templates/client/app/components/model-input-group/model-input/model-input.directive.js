(function () {
  'use strict';

  // register the directive as modelInput
  angular
    .module('<%= scriptAppName %>')
    .directive('modelInput', modelInput);

  // add modelInput dependencies to inject
  modelInput.$inject = ['$q'];

  /**
   * modelInput directive
   */
  function modelInput($q) {
    // directive definition members
    var directive = {
      scope: {
        form: '=',
        fieldDef: '=fieldDefinition',
        ngModel: '=ngModel',
        ngChange: '=ngChange'
      },
      template: '<span ng-include="getContentUrl()"></span>',
      link: link,
      replace: true,
      restrict: 'EA'
    };

    return directive;

    function link(scope) {
      var fieldDef = scope.fieldDef;
      scope.getContentUrl = getContentUrl;

      switch (fieldDef.type) {
        case 'select/resource':
        case 'select': {
          var originalValue = scope.ngModel[fieldDef.name];
          if (fieldDef.valueKey && originalValue && originalValue[fieldDef.valueKey]) {
            scope.ngModel[fieldDef.name] = originalValue[fieldDef.valueKey];
            scope.options = [originalValue];
          }
          scope.options = fieldDef.options || [originalValue];
          scope.getOptions = getOptions;
          scope.contentUrl = 'select.html';
          break;
        }
        default: {
          scope.contentUrl = 'input.html'
        }
      }

      function getContentUrl() {
        return 'app/components/model-input-group/model-input/' + scope.contentUrl;
      }

      function getOptions() {
        if (!fieldDef.getOptions) return $q.when();
        return fieldDef.getOptions(scope.ngModel).then(function(options) {
          scope.options = options;
        });
      }
    }
  }

})();
