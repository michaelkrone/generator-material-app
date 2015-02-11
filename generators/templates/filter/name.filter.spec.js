'use strict';

describe('Filter: <%= classedName %>', function () {

	// load the filter's module
	beforeEach(module('<%= scriptAppName %>'));

	// initialize a new instance of the filter before each test
	var <%= classedName %>;
	beforeEach(inject(function ($filter) {
		<%= classedName %> = $filter('<%= classedName %>');
	}));

	it('should be defined', function () {
		Should.exist(<%= classedName %>);
	});

	it('should return the input prefixed with "<%= classedName %> filter"', function () {
		var text = '<%= scriptAppName %>';
		<%= classedName %>(text).should.equal('<%= classedName %> filter: ' + text)
	});

});
