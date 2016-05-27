(function () {
  'use strict';
  var minimumDatePart = 'YYYY-MM-DDTHH:mm:ss.SSSZZ';

  // register the service as DateInterceptorService
  angular
    .module('<%= scriptAppName %>')
    .constant('DateInterceptor', DateInterceptor);

  // add DateInterceptor dependencies to inject
  // DateInterceptor.$inject = [''];

  /**
   * DateInterceptor factory constructor
   * AngularJS will instantiate a singleton which is
   * an object that has the members of this factory
   */
  function DateInterceptor(input) {
    // Ignore things that aren't objects.
    if (!angular.isObject(input)) return input;

    for (var key in input) {
      if (!input.hasOwnProperty(key)) continue;

      var value = input[key];
      var dateTime = moment(value, minimumDatePart);
      // Check for string properties which look like dates.
      if (angular.isString(value) && dateTime.isValid()) {
        input[key] = dateTime.toDate();
      } else if (angular.isObject(value)) {
        // Recurse into object
        DateInterceptor(value);
      }
    }
    return input;
  }

})();
