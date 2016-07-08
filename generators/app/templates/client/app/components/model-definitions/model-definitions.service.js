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
    var aliasAndShortHands = {
      required: 'validators.required',
      format: 'validators.pattern',
      mongoose: 'validators.mongoose',
      repeatInput: 'validators.repeat-input',
      remoteUnique: 'validators.remote-unique'
    };

    var defaultValidatorErrors = {
      required: 'Required',
      pattern: function(propDef) {
        return 'Should fit regex ' + propDef.validators['repeat-input'].value;
      },
      mongoose: 'Already in use',
      'remote-unique': 'Already in use',
      'repeat-input': function(propDef, modelDef) {
        var validator = propDef.validators['repeat-input'];
        var refDef = modelDef[validator.value];
        var desc = refDef && refDef.desc || validator.value;
        return 'Should repeat ' + desc;
      }
    };

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
      return propDefs
        .map(deAliasAndShorthand)
        .map(normalize)
        .map(extendDefaultRoot)
        .map(extendDefaultChildren);

      function extendDefaultChildren(propDef) {
        extendDefaultValidators(propDef.validators);
        return propDef;

        function extendDefaultValidators(validators) {
          angular.forEach(validators, function(validator, name) {
            var error = validator.error || defaultValidatorErrors[name];
            validator.error = angular.isFunction(error) ? error(propDef, propDefs.$map) : error;
          });
        }
      }
    }

    function deAliasAndShorthand(propDef) {
      angular.forEach(aliasAndShortHands, function (name, alias) {
        if (propDef[alias]) {
          var obj = getDeepValue(propDef, name) || {};
          setDeepValue(propDef, name, propDef[alias]);
          delete propDef[alias];
        }
      });
      return propDef;
    }

    function normalize(propDef) {
      normalizeValidators();

      return propDef;

      function normalizeValidators() {
        if (propDef.validators) {
          angular.forEach(propDef.validators, function(validator, name) {
            propDef.validators[name] = angular.isObject(validator) && validator.toString() === '[object Object]'
              ? validator
              : {value: validator};
          });
        }
      }
    }

    function extendDefaultRoot(propDef) {
      var defaultDef = {
        desc: convertToDefaultDesc(propDef.name.substr(propDef.name.lastIndexOf('.') + 1))
      };

      switch(propDef.type) {
        case 'cad':
        case 'pdf':
        case 'hex':
        case 'zip':
        case 'img':
        case 'excel': {
          propDef.urlDesc = propDef.urlDesc || propDef.type;
          propDef.type = 'url';
          break;
        }
        case 'select/resource': {
          selectResource();
          break;
        }
      }

      var overrideDefaults = angular.extend(defaultDef, propDef);
      return angular.extend(propDef, overrideDefaults);

      function selectResource() {
        angular.extend(defaultDef, {
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
    }

    function flat(nestedDef) {
      var flattenDefs = [];
      flattenDefs.$map = {};
      flatNestedPropDefinition(nestedDef);
      return flattenDefs;

      function flatNestedPropDefinition(nestedDef, preName) {
        angular.forEach(nestedDef, flatPropDefinition);

        function flatPropDefinition(def, name) {
          var propDef = {name: preName ? [preName, name].join('.') : name};

          if (angular.isString(def)) {
            propDef.type = def;
          } else if (angular.isObject(def)) {
            if (angular.isString(def.type)) {
              angular.extend(propDef, def);
            } else {
              return flatNestedPropDefinition(def, name);
            }
          } else {
            throw new Error('Model\'s property definition should be a string or an object');
          }
          flattenDefs.push(propDef);
          flattenDefs.$map[propDef.name] = propDef;
        }
      }
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
            dst[key] = angular.copy(value);
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

    function convertToDefaultDesc(name) {
      return name
        .replace(/([A-Z])/g, ' $1')// insert a space before all caps
        .replace(/^./, function(str){ return str.toUpperCase(); });// uppercase the first character
    }
  }

})();
