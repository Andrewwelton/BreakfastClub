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
  $scope.$watch(AuthService.isAuthenticated, function(newValue, oldValue){
      if(typeof newValue !== "boolean") {
          $scope.loggedIn = newValue === "true";
          $scope.role = AuthService.role();
      } else {
          $scope.loggedIn = newValue;
          $scope.role = AuthService.role();
      }
  });
  $scope.role = AuthService.role();

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
.controller('TrickOrEat', function($scope, $ionicHistory, $http, AuthService) {
    //Watches the value of AuthService.isAuthenticated waiting for a change.
    //The value is sometimes returned as a string, hence the conversion
    $scope.$watch(AuthService.isAuthenticated, function(newValue, oldValue){
        if(typeof newValue !== "boolean") {
            $scope.loggedIn = newValue === "true";
        } else {
            $scope.loggedIn = newValue;
        }
    });
    $http.get("/api/team/", {"id":32}).then(function(response){
      console.log(response);
      $scope.response = response;
    });
    // Example of a variable to iterate over
    $scope.test = [{"label":"Hello World"}, {"label":"Hello World 2"}, {"label":"Hello World 3"}];
})



.controller('Routes', function ($scope, $stateParams, $http, $ionicLoading) {
    /*$http.put("/api/route/1",
        {
           
            "type" : 6
        }).then(function () { console.log("test") });*/

    $http.get("/api/route").then(function (response) {
        $scope.response = response;

        $scope.routes = angular.copy(response['data']);

        angular.forEach($scope.routes, function (obj) {
            $http.get("/api/team/"+obj.teamId).then(function (response) {
                obj.team = response['data'][0]['name'];
                 
            });


            str = obj.type.toString(2);

            obj.routeType = str.split('');

            
        });
    });

  
  
  $scope.shownRoute = null;
  $scope.toggleAccordion = function (route) {
    if ($scope.isAccordionOpen(route)) {
      $scope.shownRoute = null;
    } else {
      $scope.shownRoute = route;
      window.setTimeout(function(){
        $scope.mapSetup(route);
      }, 1000);
      // $scope.myLocation.setPosition(new google.maps.LatLng(route.startlat, route.startlong))
      // $scope.map.setCenter(new google.maps.LatLng(route.startlat, route.startlong))
    }
    //Resize if an accordion is too big -- Might be needed
    //$ionicScrollDelegate.resize();
  };

  $scope.isAccordionOpen = function(route) {
    return $scope.shownRoute === route;
  };

  $scope.mapSetup = function(route) {
    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.querySelector("#" +route.routeID+ " #map"), mapOptions);
    map.setCenter(new google.maps.LatLng(43.530737, -80.226274));
    // navigator.geolocation.getCurrentPosition(function (pos) {
    //     $scope.myLocation = new google.maps.Marker({
    //         position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
    //         map: map,
    //         title: "My Location"
    //     });
    // });
  };

  // $scope.data = {
  //     clientSide: 'ng'
  // };
  //
  // $scope.onChange = function (item) {
  //     console.log("Route:", item.team);
    // };
})

.controller('TeamList', function ($scope, $stateParams) {
  $scope.teams = [
      {
        "team": "Team Fun",
        "accessible": false,
        "routes": 2
      },
      {
        "team": "Team Weird",
        "accessible": false,
        "routes": 0
      },
      {
        "team": "Team Smart",
        "img": "test.png" ,
        "accessible": false,
        "routes": 0
      },
      {
        "team": "Team Silly",
        "accessible": true,
        "routes": 1
      },
      {
        "team": "Team Crazy",
        "accessible": false,
        "routes": 2
      },
      {
        "team": "Team Fluffy",
        "accessible": false,
        "routes": 0
      },
      {
        "team": "Team Lazy",
        "accessible": false,
        "routes": 1
      }
  ];
})

.controller('Teams', function ($scope, $stateParams, AuthService) {
  $scope.role = AuthService.role();
  $scope.shownTeam = null;
  $scope.shownRoute = null;
  $scope.toggleTeamAccordion = function(info) {
    if ($scope.isTeamAccordionOpen(info)) {
      $scope.shownTeam = null;
    } else {
      $scope.shownTeam = info;
    }
    //Resize if an accordion is too big -- Might be needed
    //$ionicScrollDelegate.resize();
  };
  $scope.isTeamAccordionOpen = function(info) {
    return $scope.shownTeam === info;
  };

  $scope.toggleRouteAccordion = function(info) {
    if ($scope.isRouteAccordionOpen(info)) {
      $scope.shownRoute = null;
    } else {
      $scope.shownRoute = info;
    }
    //Resize if an accordion is too big -- Might be needed
    //$ionicScrollDelegate.resize();
  };
  $scope.isRouteAccordionOpen = function(info) {
    return $scope.shownRoute === info;
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



.controller('Notifications', function($scope, $stateParams, AuthService) {
  $scope.test = [
    {title: "Testing How This Works", id: 1},
  ];
  $scope.role = AuthService.role();


})

.controller('LiveChat', function($scope, $stateParams) {
  $scope.test = [
    {title: "Testing How This Works", id: 1},
  ];
})

.controller('MyAccount', function($scope, $stateParams, AuthService) {
  $scope.role = AuthService.role();
})

/*var selected = [];

$scope.clicked = function (member) {
    var index = selected.indexOf(member);
    if(index > -1) {
        selected.splice(index, 1);
        member.selected = false;
    } else {
        selected.push(member);
        member.selected = true;
    }
}*/

.controller('Waiver', function($scope, $ionicPopup, $timeout, $state, $ionicViewService, AuthService) {
// An alert dialog
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Warning!',
      template: 'You must sign the waiver'
    });
    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  };

  $scope.signWaiver = function() {
    console.log("Registering with: ", $scope.registerData);
    AuthService.login("waiver","waiver"/*$scope.registerData.username, $scope.registerData.password*/);
    $ionicViewService.nextViewOptions({
        disableBack: true
    });

    $state.go("app.home", {}, {"location": "replace"});
  };
})

.controller('Register', function($scope, $stateParams, $state, AuthService) {
  $scope.registerData = {};
  $scope.registerData.teamPrivacy = "public";
  $scope.teamCaptain = $stateParams.teamCaptain;
  $scope.register = function(registerForm) {
    if(!registerForm.$valid) {
      return;
    }
    $state.go("app.waiver");
  };
});
