angular.module('starter.controllers', [])
//Main controller for the application
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, AuthService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
  }).then(function(modal) {
      $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/teamcaptain.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.teamCaptain = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
      $scope.modal.show();
  };

  // Log out of the currently logged in account
  $scope.logout = function() {
      AuthService.logout();
  };

  $scope.teamCaptainPrompt = function() {
    $scope.teamCaptain.show();
  };

  $scope.teamCaptainPromptClose = function() {
    $scope.teamCaptain.hide();
  }

  $scope.teamCaptainContinue = function(event) {
    $scope.teamCaptain.hide();
    if(event.target.id == "no") {
      $state.go("app.register",{"teamCaptain": false});
    } else {
      $state.go("app.register",{"teamCaptain": true});
    }
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
        AuthService.login($scope.loginData.username, $scope.loginData.password);
        $scope.closeLogin();
        console.log(AuthService.isAuthenticated());
    }, 1000);
  };
})
//TrickOrEat controller (AKA Home controller)
//$scope are variables that can be used in the HTML
//AuthService is needed to handle logins
.controller('TrickOrEat', function($scope, AuthService) {
    //Watches the value of AuthService.isAuthenticated waiting for a change.
    //The value is sometimes returned as a string, hence the conversion
    $scope.$watch(AuthService.isAuthenticated, function(newValue, oldValue){
        if(typeof newValue !== "boolean") {
            $scope.loggedIn = newValue === "true";
        } else {
            $scope.loggedIn = newValue;
        }
    });
    // Example of a variable to iterate over
    $scope.test = [{"label":"Hello World"}, {"label":"Hello World 2"}, {"label":"Hello World 3"}];
})

.controller('Routes', function ($scope, $stateParams) {
  $scope.routes = [
      {
        "route": "Route 1",
        "accessible": true,
        "team": [{
            "id": "1",
            "name": "Fried Chicken"
        }]
      },
      {
        "route": "Route 2",
        "accessible": true,
        "team": [{}]
      },
      {
        "route": "Route 3",
        "img": "test.png" ,
        "accessible": true,
        "team": [{}]
      },
      {
        "route": "Route 4",
        "accessible": true,
        "team": [
          {
            "id": "1",
            "name": "Cheese Omelet"
          },
          {
            "id": "2",
            "name": "Bacon and Eggs"
          }
        ]
      },
      {
        "route": "Route 5",
        "accessible": false,
        "team": [{}]
      },
      {
        "route": "Route 6",
        "accessible": true,
        "team": [{}]
      },
      {
        "route": "Route 7",
        "accessible": false,
        team: [{
            "id": "1",
            "name": "Rice Crackers",
        }]
      }
  ];
  $scope.shownRoute = null;
  $scope.toggleAccordion = function(route) {
    if ($scope.isAccordionOpen(route)) {
      $scope.shownRoute = null;
    } else {
      $scope.shownRoute = route;
    }
    //Resize if an accordion is too big -- Might be needed
    //$ionicScrollDelegate.resize();
  };
  $scope.isAccordionOpen = function(route) {
    return $scope.shownRoute === route;
  };

  // $scope.data = {
  //     clientSide: 'ng'
  // };
  //
  // $scope.onChange = function (item) {
  //     console.log("Route:", item.team);
  // };
})

.controller('Teams', function ($scope, $stateParams) {

  $scope.shownInfo = null;
  $scope.toggleAccordion = function(info) {
    if ($scope.isAccordionOpen(info)) {
      $scope.shownInfo = null;
    } else {
      $scope.shownInfo = info;
    }
    //Resize if an accordion is too big -- Might be needed
    //$ionicScrollDelegate.resize();
  };
  $scope.isAccordionOpen = function(info) {
    return $scope.shownInfo === info;
  };

  // $scope.data = {
  //     clientSide: 'ng'
  // };
  //
  // $scope.onChange = function (item) {
  //     console.log("Route:", item.team);
  // };
})

.controller('addRoute', function ($scope, $stateParams) {
  $scope.routes = [
      {
        "route": "Route 1",
        "accessible": true,
        "team": [{
            "id": "1",
            "name": "Fried Chicken"
        }]
      },
      {
        "route": "Route 2",
        "accessible": true,
        "team": [{}]
      },
      {
        "route": "Route 3",
        "img": "test.png" ,
        "accessible": true,
        "team": [{}]
      },
      {
        "route": "Route 4",
        "accessible": true,
        "team": [
          {
            "id": "1",
            "name": "Cheese Omelet"
          },
          {
            "id": "2",
            "name": "Bacon and Eggs"
          }
        ]
      },
      {
        "route": "Route 5",
        "accessible": false,
        "team": [{}]
      },
      {
        "route": "Route 6",
        "accessible": true,
        "team": [{}]
      },
      {
        "route": "Route 7",
        "accessible": false,
        team: [{
            "id": "1",
            "name": "Rice Crackers",
        }]
      }
  ];
  var selected = [];

  $scope.clicked = function (member) {
      var index = selected.indexOf(member);
      if(index > -1) {
          selected.splice(index, 1);
          member.selected = false;
      } else {
          selected.push(member);
          member.selected = true;
      }
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.test = [
    {title: "Testing How This Works", id: 1},
  ];
  $scope.temp = "ASDF"
})

var selected = [];

$scope.clicked = function (member) {
    var index = selected.indexOf(member);
    if(index > -1) {
        selected.splice(index, 1);
        member.selected = false;
    } else {
        selected.push(member);
        member.selected = true;
    }
}

.controller('Register', function($scope, $stateParams, $state, AuthService) {
  $scope.registerData = {};
  $scope.registerData.teamPrivacy = "public";
  $scope.teamCaptain = $stateParams.teamCaptain;
  $scope.register = function(registerForm) {
    if(!registerForm.$valid) {
      return;
    }
    console.log("Registering with: ", $scope.registerData);
    AuthService.login($scope.registerData.username, $scope.registerData.password);
    $state.go("app.home");
  };
});
