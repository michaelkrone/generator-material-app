/**
 * Created by stupid on 16-6-8.
 */

var roles = require('../../server/lib/auth/auth.service').roles;
var users = require('../../server/config/testUsers');

var LoginPage = function() {
  this.login = function(url, role) {
    role = role || roles.getMaxRole();
    var user = users.getUserByRole(role);
    browser.get(url);
    element(by.model('login.user.name')).sendKeys(user.name);
    element(by.model('login.user.password')).sendKeys(user.password);
    element(by.name('login-button')).click();
  };
};

module.exports = new LoginPage();
