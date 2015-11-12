angular.module("starter")
.service("AuthService", function(){
  var username = "";
  var isAuthenticated = false;
  var role = "";

  function login(name, pw) {
    username = name;
    if(name.toLowerCase() == "admin") {
      role = "admin";
    } else if(name.toLowerCase() == "captain") {
      role = "captain";
    } else {
      role = "participant";
    }
    isAuthenticated = true;
    window.localStorage.setItem("loggedIn", true);
    window.localStorage.setItem("role", role);
  }
  function logout() {
    username = "";
    isAuthenticated = false;
    role = "";
    window.localStorage.setItem("loggedIn", false);
    window.localStorage.setItem("role", "");
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
    },
    role: function() {
      if(!isAuthenticated()) {
        return;
      }
      role = window.localStorage.getItem("role");
      return role;
    }
  }
})
