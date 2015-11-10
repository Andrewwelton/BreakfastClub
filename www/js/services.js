angular.module("starter")
.service("AuthService", function(){
  var username = "";
  var isAuthenticated = false;
  var role = "";

  function login(name, pw) {
    username = name;
    isAuthenticated = true;
    window.localStorage.setItem("loggedIn", true);
  }
  return {
    login: login,
    username: function(){return username;},
    isAuthenticated: function(){
      if(!isAuthenticated) {
        var localVal = window.localStorage.getItem("loggedIn");
        if(localVal) {
          isAuthenticated = true;
        }
      }
      return isAuthenticated;
    }
  }
})
