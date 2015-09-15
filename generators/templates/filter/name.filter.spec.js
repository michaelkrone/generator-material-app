'use strict';

describe('<%= moduleName %> Filter: <%= controllerName %>', function () {

	// load the filter's module
	beforeEach(module('<%= moduleName %>'));

	// initialize a new instance of the filter before each test
	var <%= controllerName %>;
	beforeEach(inject(function ($filter) {
		<%= controllerName %> = $filter('<%= controllerName %>');
	}));

	it('should be defined', function () {
		Should.exist(<%= controllerName %>);
	});

	it('should return the input prefixed with "<%= controllerName %> filter"', function () {
		var text = '<%= moduleName %>';
		<%= controllerName %>(text).should.equal('<%= controllerName %> filter: ' + text)
	});

});
