(function () {
  'use strict';

  // register the directive as modelInputGroup
  angular
    .module('<%= scriptAppName %>')
    .directive('modelInputGroup', modelInputGroup);

  // add modelInputGroup dependencies to inject
   modelInputGroup.$inject = ['ModelDefinitions'];

  /**
   * modelInputGroup directive
   */
  function modelInputGroup(ModelDefinitions) {
    // directive definition members
    var directive = {
      require: 'ngModel',
      scope: {
        fieldDefinitions: '=',
        ngModel: '='
      },
      link: link,
      templateUrl: 'app/components/model-input-group/model-input-group.html',
      restrict: 'EA'
    };

    return directive;

    // directives link definition
    function link(scope, element, attrs, ngModel) {
      scope.deepFields = scope.fieldDefinitions.filter(function(fieldDef) {
        return fieldDef.name.indexOf('.') !== -1;
      });

      angular.forEach(scope.deepFields, function watchDeepFields (fieldDef) {
        scope.$watch('ngModel[\'' + fieldDef.name + '\']', function (value) {
          setDeepFieldForViewValue(fieldDef, value);
        });
      });

      ngModel.$render = function() {
        if (!ngModel.$viewValue) return;
        angular.forEach(scope.deepFields, initDeepFieldFromViewValue);
      };

      function setDeepFieldForViewValue (fieldDef, value) {
        if (!value) return;
        ModelDefinitions.set(scope.ngModel, fieldDef.name, value);
        ngModel.$setViewValue(scope.ngModel);
      }

      function initDeepFieldFromViewValue (fieldDef) {
        scope.ngModel[fieldDef.name] = ModelDefinitions.get(ngModel.$viewValue, fieldDef.name);
      }
    }
  }

})();
