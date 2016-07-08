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
      scope.selectChanged = selectChanged;

      switch (fieldDef.type) {
        case 'select/resource':
        case 'select': {
          var originalValue = scope.ngModel[fieldDef.name];
          scope.options = fieldDef.options || [originalValue];
          scope.getOptions = getOptions;
          scope.contentUrl = 'select.html';
          break;
        }
        default: {
          scope.contentUrl = 'input.html'
        }
      }

      if (fieldDef.auto && !angular.isFunction(fieldDef.auto)) {
        scope.ngModel[fieldDef.name] = fieldDef.auto;
        scope.ngChange(fieldDef.name, fieldDef.auto);
      }

      function selectChanged() {
        var field = scope.ngModel[fieldDef.name];
        scope.ngChange(fieldDef.name, fieldDef.valueKey ? field[fieldDef.valueKey] : field);
      }

      function getContentUrl() {
        return 'app/components/model-input-group/model-input/' + scope.contentUrl;
      }

      function getOptions() {
        if (!fieldDef.getOptions) return $q.when();
        return fieldDef.getOptions(scope.ngModel).then(function(options) {
          scope.ngModel[fieldDef.name] = refreshOptionRef(options, scope.ngModel[fieldDef.name]);
          scope.options = options;
        });
      }

      function refreshOptionRef(options, field) {
        if (field && field[fieldDef.valueKey]) {
          for (var i in options) {
            if (option[i][fieldDef.valueKey] === field[fieldDef.valueKey]) {
              return option[i];
            }
          }
        }
        return field;
      }
    }
  }

})();
