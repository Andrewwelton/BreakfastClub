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
  function logout() {
    username = "";
    isAuthenticated = false;
    role = "";
    window.localStorage.setItem("loggedIn", false);
  }
  return {
    login: login,
    logout: logout,
    username: function(){return username;},
    isAuthenticated: function(){
      if(!isAuthenticated) {
        isAuthenticated = window.localStorage.getItem("loggedIn");
        if(isAuthenticated === null) {
          isAuthenticated = false;
        }
      }
      return isAuthenticated;
    }
  }
})
