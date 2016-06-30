(function () {
  'use strict';
  var validDateFormats = [
    'YYYY-MM-DDTHH:mm:ss.SSSZZ',
    'YYYY-MM-DDTHH:mm:ss',
    'YYYY-MM-DD',
  ];

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
      if (angular.isString(value)) {
        // Check for string properties which look like dates.
        validDateFormats.forEach(function(format) {
          var dateTime = moment(value, format, true);
          if (dateTime.isValid()) {
            input[key] = dateTime.toDate();
            return;
          }
        });
      } else if (angular.isObject(value)) {
        // Recurse into object
        DateInterceptor(value);
      }

    }
    return input;
  }

})();
