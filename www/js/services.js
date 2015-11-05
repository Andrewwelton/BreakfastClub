angular.module("starter")
.service("AuthService", function(){
  var username = "";
  var isAuthenticated = false;
  var role = "";

  function login(name, pw) {
    username = name;
    isAuthenticated = true;
  }
  return {
    login: login,
    username: function(){return username;},
    isAuthenticated: function(){return isAuthenticated;}
  }
})
