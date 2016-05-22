(function () {
  'use strict';

  // register the service as ModelDefinitionsService
  angular
    .module('<%= scriptAppName %>')
    .factory('ModelDefinitions', ModelDefinitions);

  // add ModelDefinitions dependencies to inject
  // ModelDefinitions.$inject = [''];

  /**
   * ModelDefinitions factory constructor
   * AngularJS will instantiate a singleton which is
   * an object that has the members of this factory
   */
  function ModelDefinitions() {
    // public API
    return {
      flat: flat,
      get: getDeepValue,
      set: setDeepValue
    };

    // factory function definitions
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
        propDef.desc = propDef.desc || (name[0].toUpperCase() + name.slice(1));
        flattenDefs.push(propDef);
      }
      return flattenDefs;
    }

    function setDeepValue (obj, propChain, value) {
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
      if (angular.isString(propChain)) {
        propChain = propChain.split('.');
      }
      if (!propChain.length) return obj;
      var nextObj = obj[propChain[0]];
      return nextObj ? getDeepValue(nextObj, propChain.slice(1)) : nextObj;
    }
  }

})();
