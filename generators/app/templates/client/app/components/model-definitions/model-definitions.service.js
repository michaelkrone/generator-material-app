(function () {
  'use strict';

  // register the service as ModelDefinitionsService
  angular
    .module('<%= scriptAppName %>')
    .factory('ModelDefinitions', ModelDefinitions);

  // add ModelDefinitions dependencies to inject
  ModelDefinitions.$inject = ['$filter', '$q'];

  /**
   * ModelDefinitions factory constructor
   * AngularJS will instantiate a singleton which is
   * an object that has the members of this factory
   */
  function ModelDefinitions($filter, $q) {
    // public API
    angular.extend(createModelDefinition, {
      flat: flat,
      extend: extendDeep,
      get: getDeepValue,
      display: display,
      set: setDeepValue
    });

    return createModelDefinition;

    function createModelDefinition(modelDef) {
      var propDefs = flat(modelDef);
      return propDefs.map(extendDefault);
    }

    function extendDefault(propDef) {
      var defaultResourceDef = {
        desc: propDef.name[0].toUpperCase() + propDef.name.slice(1)
      };

      if (propDef.type === 'select/resource') {
        angular.extend(defaultResourceDef, {
          getOptions: function() {
            if (!propDef.resource || !propDef.resource.query) {
              console.warn('type is select/resource, but resource is not set');
              return $q.when([])
            }
            return propDef.resource.query(propDef.params).$promise;
          },
          valueKey: '_id',
          displayKey: 'name',
        });
      }

      return angular.extend({}, defaultResourceDef, propDef);
    }

    function flat(nestedDef, preName) {
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
            flattenDefs = flattenDefs.concat(flat(def, name));
            return;
          }
        } else {
          throw new Error('Model\'s property definition should be a string or an object');
        }
        flattenDefs.push(propDef);
      }
      return flattenDefs;
    }

    function setDeepValue (obj, propChain, value) {
      if (!obj) return;
      if (angular.isString(propChain)) {
        propChain = propChain.split('.');
      }
      if (!propChain.length) return;
      var curProp = propChain[0];
      if (propChain.length === 1) {
        return obj[curProp] = value;
      }
      obj[curProp] = obj[curProp] || {};
      setDeepValue(obj[curProp], propChain.slice(1), value);
    }

    function getDeepValue (obj, propChain) {
      if (!obj) return;
      if (angular.isString(propChain)) {
        propChain = propChain.split('.');
      }
      if (!propChain.length) return obj;
      var nextObj = obj[propChain[0]];
      return nextObj ? getDeepValue(nextObj, propChain.slice(1)) : nextObj;
    }

    function extendDeep(dst) {
      angular.forEach(arguments, function(obj) {
        if (obj === dst) return;

        angular.forEach(obj, function(value, key) {
          if (dst[key] && angular.isObject(dst[key])) {
            extendDeep(dst[key], value);
          } else {
            dst[key] = value;
          }
        });
      });
      return dst;
    }

    function display(obj, propDef) {
      if (!obj || propDef.when && !propDef.when(obj)) return;
      var value = getDeepValue(obj, propDef.name);
      if (!value) return value;
      var displayValue = propDef.displayKey ? value[propDef.displayKey] : value;
      return propDef.ngFilter ? applyFilter(displayValue, propDef.ngFilter) : displayValue;
    }

    function applyFilter(value, filterName) {
      if (!filterName) return value;
      var filter = angular.isString(filterName) ? {
        name: filterName,
      } : angular.copy(filterName);
      filter.args = [value].concat(filter.args || []);
      return $filter(filter.name).apply(null, filter.args);
    }
  }

})();
