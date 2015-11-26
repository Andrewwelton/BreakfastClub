angular.module("starter")
.service("AuthService", function($http){
  var id = null;
  var username = "";
  var password = "";
  var isAuthenticated = false;
  var role = -1;
  var name = "";
  var email = "";
  var teamID = 0;
  var accessibleStatus = null;
  var studentStatus = null;
  var busStatus = null;
  var participantStatus = null;

  function login(name, pw) {
    return $http.get("/api/participants/").then(function(response){
      responseData = response.data;
      for(var i = 0; i < responseData.length; i++) {
        var user = responseData[i];
        //login the user
        if(user.username == name && user.password == pw){
          console.log(user);
          id = user.id;
          isAuthenticated = true;
          username = user.username;
          password = user.password;
          role = user.type;
          name = user.name;
          email = user.email;
          teamID = user.teamID;
          accessibleStatus = user.accessibleStatus;
          studentStatus = user.studentStatus;
          busStatus = user.busStatus;
          participantStatus = user.participantStatus;
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("id", id);
          window.localStorage.setItem("username", username);
          window.localStorage.setItem("password", password);
          window.localStorage.setItem("role", role);
          window.localStorage.setItem("name", name);
          window.localStorage.setItem("email", email);
          window.localStorage.setItem("teamID", teamID);
          window.localStorage.setItem("accessibleStatus", accessibleStatus);
          window.localStorage.setItem("studentStatus", studentStatus);
          window.localStorage.setItem("busStatus", busStatus);
          window.localStorage.setItem("participantStatus", participantStatus);
          return true;
        }
      }
      //bad username / password
      return false;
    });
  }
  function logout() {
    username = "";
    password = "";
    isAuthenticated = false;
    role = -1;
    name = "";
    email = "";
    teamID = 0;
    accessibleStatus = null;
    studentStatus = null;
    busStatus = null;
    participantStatus = null;
    window.localStorage.setItem("loggedIn", false);
    window.localStorage.setItem("id", null);
    window.localStorage.setItem("username", "");
    window.localStorage.setItem("password", "");
    window.localStorage.setItem("role", -1);
    window.localStorage.setItem("name", "");
    window.localStorage.setItem("email", "");
    window.localStorage.setItem("teamID", 0);
    window.localStorage.setItem("accessibleStatus", null);
    window.localStorage.setItem("studentStatus", null);
    window.localStorage.setItem("busStatus", null);
    window.localStorage.setItem("participantStatus", null);
  }
  return {
    login: login,
    logout: logout,
    id: function(){
      if(id == null) {
        id = window.localStorage.getItem("id");
      }
      return id;
    },
    username: function() {
      if(username.length == 0) {
        username = window.localStorage.getItem("username");
      }
      return username;
    },
    password: function() {
      if(password.length == 0) {
        password = window.localStorage.getItem("password");
      }
      return password;
    },
    name: function() {
      if(name.length == 0) {
        name = window.localStorage.getItem("name");
      }
      return name;
    },
    email: function() {
      if(email.length == 0) {
        email = window.localStorage.getItem("email");
      }
      return email;
    },
    teamID: function() {
      if(teamID == 0) {
        teamID = window.localStorage.getItem("teamID");
      }
      return teamID;
    },
    accessibleStatus: function() {
      if(accessibleStatus == null) {
        accessibleStatus = window.localStorage.getItem("accessibleStatus");
      }
      return accessibleStatus;
    },
    studentStatus: function() {
      if(studentStatus == null) {
        studentStatus = window.localStorage.getItem("studentStatus");
      }
      return studentStatus;
    },
    busStatus: function() {
      if(busStatus == null) {
        busStatus = window.localStorage.getItem("busStatus");
      }
      return busStatus;
    },
    participantStatus: function() {
      if(participantStatus == null) {
        participantStatus = window.localStorage.getItem("participantStatus");
      }
      return participantStatus;
    },
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
      if(!isAuthenticated) {
        isAuthenticated = window.localStorage.getItem("loggedIn");
        if(isAuthenticated === null) {
          isAuthenticated = false;
        }
      }
      if(!isAuthenticated) {
        return;
      }
      role = window.localStorage.getItem("role");
      return role;
    }
  }
})
