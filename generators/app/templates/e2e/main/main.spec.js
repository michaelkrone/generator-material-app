'use strict';

describe('Main View', function() {
	var page;

	beforeEach(function() {
		browser.get('/');
		page = require('./main.po');
	});

	it('should include jumbotron with correct data', function() {
		expect(page.headline.getText()).toBe('The awesome <%= appname %> app');
	});
});
