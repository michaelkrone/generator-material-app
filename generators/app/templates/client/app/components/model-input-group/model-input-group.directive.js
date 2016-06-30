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
        nestedModel: '=ngModel',
        form: '='
      },
      link: link,
      templateUrl: 'app/components/model-input-group/model-input-group.html',
      restrict: 'EA'
    };

    return directive;

    // directives link definition
    function link(scope, element, attrs, ctrl) {
      scope.fieldChanged = fieldChanged;

      var autoFields = scope.fieldDefinitions.filter(function(def) {
        return def.auto;
      });

      ctrl.$render = function() {
        if (!ctrl.$viewValue) return;
        scope.nestedModel = ctrl.$viewValue;
        scope.flattenModel = {};
        angular.forEach(scope.fieldDefinitions, function(fieldDef) {
          scope.flattenModel[fieldDef.name] = ModelDefinitions.get(scope.nestedModel, fieldDef.name);
        });
      };

      function fieldChanged(name, value, dontSetViewValue) {
        ModelDefinitions.set(scope.nestedModel, name, value);
        angular.forEach(autoFields, function(autoField) {
          var newValue = autoField.auto(scope.nestedModel, scope.flattenModel);
          if (newValue !== scope.flattenModel[autoField.name]) {
            scope.flattenModel[autoField.name] = newValue;
            fieldChanged(autoField.name, newValue, 'dontSetViewValue');
          }
        });
        if (!dontSetViewValue) {
          ctrl.$setViewValue(scope.nestedModel);
        }
      }
    }
  }

})();
