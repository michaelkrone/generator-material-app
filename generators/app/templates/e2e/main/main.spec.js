'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    <% if (features.auth) { %>browser.get('/');
    <% } else { %>var loginPage = require('../login/login.po');
    loginPage.login('/');
    <% } %>
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.headline.getText()).toBe('The awesome <%= appname %> app');
  });
});
