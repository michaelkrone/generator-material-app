/**
 * Created by stupid on 16-6-8.
 */
var users = [{
  provider: 'local',
  role: 'user',
  name: 'Test User',
  password: 'password',
  active: true
}, {
  provider: 'local',
  role: 'admin',
  name: 'Admin',
  password: 'password',
  active: true
}, {
  provider: 'local',
  role: 'root',
  name: 'Root',
  password: 'password',
  active: true
}];

users.getUserByRole = function(role) {
  var i;
  for (i = 0; i < users.length; i++) {
    if (users[i].role === role) break;
  }
  return users[i];
};

module.exports = users;
