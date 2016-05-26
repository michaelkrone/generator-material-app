(function () {
  'use strict';

  // register the service as DateInterceptorService
  angular
    .module('balanarApp')
    .constant('DateInterceptor', DateInterceptor);

  // add DateInterceptor dependencies to inject
  // DateInterceptor.$inject = [''];

  /**
   * DateInterceptor factory constructor
   * AngularJS will instantiate a singleton which is
   * an object that has the members of this factory
   */
  function DateInterceptor(input) {
    var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

    // Ignore things that aren't objects.
    if (!angular.isObject(input)) return input;

    for (var key in input) {
      if (!input.hasOwnProperty(key)) continue;

      var value = input[key];
      var match;
      // Check for string properties which look like dates.
      if (angular.isString(value) && (match = value.match(regexIso8601))) {
        var milliseconds = Date.parse(match[0])
        if (!isNaN(milliseconds)) {
          input[key] = new Date(milliseconds);
        }
      } else if (angular.isObject(value)) {
        // Recurse into object
        DateInterceptor(value);
      }
    }
    return input;
  }

})();
