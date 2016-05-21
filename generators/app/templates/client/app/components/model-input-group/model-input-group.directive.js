(function () {
  'use strict';

  // register the directive as modelInputGroup
  angular
    .module('<%= scriptAppName %>')
    .directive('modelInputGroup', modelInputGroup);

  // add modelInputGroup dependencies to inject
  // modelInputGroup.$inject = [''];

  /**
   * modelInputGroup directive
   */
  function modelInputGroup() {
    // directive definition members
    var directive = {
      require: 'ngModel',
      scope: {
        modelDefinition: '=',
        ngModel: '='
      },
      link: link,
      templateUrl: 'app/components/model-input-group/model-input-group.html',
      restrict: 'EA'
    };

    return directive;

    // directives link definition
    function link(scope, element, attrs, ngModel) {

      scope.propDefinitions = flatDefinitions(scope.modelDefinition);
      angular.forEach(scope.propDefinitions, watchDeepProps);

      function watchDeepProps (propDef) {
        var propChain = propDef.name.split('.');
        if (!propChain.length) return;
        scope.$watch('ngModel[\'' + propDef.name + '\']', function (value) {
          if (!value) return;
          setDeepValue(scope.ngModel, propChain, value);
          ngModel.$setViewValue(scope.ngModel);
        });
      }

      ngModel.$render = function() {
        console.log('ngModel.$render', ngModel.$viewValue);
        angular.forEach(scope.propDefinitions, initDeepProps);

        function initDeepProps (propDef) {
          var propChain = propDef.name.split('.');
          if (!propChain.length) return;
          console.log(propDef.name, getDeepValue(ngModel.$viewValue, propChain))
          scope.ngModel[propDef.name] = getDeepValue(ngModel.$viewValue, propChain);
        }
      };

      function flatDefinitions(nestedDef, preName) {
        var flattenDefs = [];
        angular.forEach(nestedDef, flatPropDefinition);

        function flatPropDefinition(def, name) {
          var propDef = {name: preName ? [preName, name].join('.') : name};

          if (angular.isString(def)) {
            propDef.type = def;
          } else if (angular.isObject(def)) {
            if (angular.isString(def.type)) {
              angular.extend(propDef, def);
            } else {
              flattenDefs = flattenDefs.concat(flatDefinitions(def, name));
              return;
            }
          } else {
            throw new Error('Model\'s property definition should be a string or an object');
          }
          propDef.desc = propDef.desc || (name[0].toUpperCase() + name.slice(1));
          flattenDefs.push(propDef);
        }
        return flattenDefs;
      }

      function setDeepValue (obj, propChain, value) {
        if (!propChain.length) return;
        var curProp = propChain[0];
        if (propChain.length === 1) {
          return obj[curProp] = value;
        }
        obj[curProp] = obj[curProp] || {};
        setDeepValue(obj[curProp], propChain.slice(1), value);
      }

      function getDeepValue (obj, propChain) {
        if (!propChain.length) return obj;
        return getDeepValue(obj[propChain[0]], propChain.slice(1));
      }
    }
  }

})();
