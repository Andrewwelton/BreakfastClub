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
      $scope.role = parseInt(AuthService.role());
    } else {
      $scope.loggedIn = newValue;
      $scope.role = parseInt(AuthService.role());
    }
  });
  $scope.role = parseInt(AuthService.role());

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
        AuthService.login($scope.loginData.username, $scope.loginData.password).then(function(success){
            if(success) {
                $scope.closeLogin();
            } else {
                $scope.loginError = true;
            }
        });
    }
})
//TrickOrEat controller (AKA Home controller)
//$scope are variables that can be used in the HTML
//AuthService is needed to handle logins
.controller('TrickOrEat', function($scope, $ionicHistory, $http, $ionicScrollDelegate, AuthService) {
    //Watches the value of AuthService.isAuthenticated waiting for a change.
    //The value is sometimes returned as a string, hence the conversion
    $scope.$watch(AuthService.isAuthenticated, function(newValue, oldValue){
        if(typeof newValue !== "boolean") {
            $scope.loggedIn = newValue === "true";
        } else {
            $scope.loggedIn = newValue;
        }
    });
    $http.get("/api/team/1").then(function(response){
        console.log(response);
        $scope.response = response;
        $ionicScrollDelegate.resize();
    });
    // Example of a variable to iterate over
    $scope.test = [{"label":"Hello World"}, {"label":"Hello World 2"}, {"label":"Hello World 3"}];
})

.controller('Routes', function ($scope, $stateParams, $http, $ionicLoading) {

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


    $scope.mapSetup = function (route) {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.querySelector("#Route" + route.id + " #map"), mapOptions);

        var coords = [
            { lat: 43.530737, lng: -80.226274 },
            { lat: 43.529803, lng: -80.224611 },
            { lat: 43.529453, lng: -80.224128 },
            { lat: 43.527594, lng: -80.226746 }

        ];

        var path = new google.maps.Polyline({
            path: coords,
            geodesic: true,
            strokeColor: "#FFAA00",
            strokeOpacity: 1.0,
            strokeWeight: 5
        });
        map.setCenter(new google.maps.LatLng(43.530737, -80.226274));

        path.setMap(map);
        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(43.530737, -80.226274),
                map: map,
                title: "Start"
            });
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(43.527594, -80.226746),
                map: map,
                title: "End"
            });
        });

    };
})

.controller('TeamList', function ($scope, $stateParams, $http, $state) {
  $http.get("/api/team/").then(function(response){
    $scope.teams = response.data;
    console.log($scope.teams);
  });
  $scope.goToTeam = function(team){
    $state.go("app.team", {"teamId": team.id})
  }
})

.controller('Team', function ($scope, $stateParams, AuthService, $http) {
    $scope.role = AuthService.role();
    $scope.shownTeam = null;
    $scope.shownRoute = null;

  var numMems = 0;
  var teamID;

  console.log($stateParams);

  if($stateParams.teamId != null) {
    teamID = $stateParams.teamId;
  } else {
    teamID = parseInt(AuthService.teamID());
  }

    $http.get("/api/team/" + teamID).then(function(team){
        $scope.team = team;
    });

    $http.get("/api/route").then(function(routes){
        console.log(routes);
        $scope.routes = routes;
    });

    $http.get("/api/participants/teamId/" + teamID).then(function(teamMembers){

        numMems = teamMembers['data']['length'];
        $scope.number = 5 - numMems;

        $scope.teamMembers = teamMembers;
        console.log(teamMembers);
    });

    $http.get("/api/route/teamId/" + teamID).then(function(teamRoutes){
        //console.log(teamRoutes);
        $scope.teamRoutes = teamRoutes;

    });

  $scope.teamAdd = {};

  $scope.newMember = function() {

    for(var i = 0;i< $scope.number;i++) {
      if($scope.teamAdd[i]['name'] != null && $scope.teamAdd[i]['email'] != null) {
        $scope.show = 1;
        return;
      }
    }
  };

  $scope.getNumber = function(num) {
    return new Array(num);
  }

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
})

.controller('addRoute', function ($scope, $stateParams, $http, AuthService) {

  $http.get("/api/route").then(function(routes){
    console.log(routes);
    $scope.routes = routes;
  });

  var selected = [];
  var teamID = parseInt(AuthService.teamID());

  $scope.addR = function() {
    $scope.routes['data'].forEach(function(route) {
      if(route.selected) {
        $http.put("/api/route/" + route['id'], { 'teamId': teamID }).success(function(result) {
          console.log(result);
          $scope.resultPut = result;
        }).error(function() {
          console.log("error");
        });
      }
    });
  }


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

.controller('WhatWeNeed', function($scope, $stateParams, $http) {
    $http.get("farm").then(function(response){
        $scope.needs = response.data;
    });
})

.controller('busWaiver', function($scope, $stateParams, $http, AuthService, $state) {
    var userID = parseInt(AuthService.id());
    $scope.signBusWaiver = function(){
        $http.put("/api/participants/" + userID, {"busStatus" : 1})
        .success(function(response){
            AuthService.login(AuthService.username(), AuthService.password()).then(function(r){
                $state.go("app.myaccount");
            });

        })
        .error(function(response){
            alert("Unable to sign the waiver, please try again later.");
        })
    };
})

.controller('MyAccount', function($scope, $stateParams, $http, $timeout, AuthService) {
    $scope.role = parseInt(AuthService.role());
    $scope.name = AuthService.name();
    $scope.email = AuthService.email();
    $scope.$watch(AuthService.busStatus, function(newValue, oldValue){
        $scope.busStatus = parseInt(newValue);

    });


    $scope.accessibilityToggle = {checked: AuthService.accessibleStatus() === "true" ? true : false};
    $scope.$watch('accessibilityToggle.checked', function(newVal, oldVal){
        $http.put("/api/participants/" + parseInt(AuthService.id()), {"accessibleStatus" : newVal ? 1 : 0})
        .success(function(response){
            AuthService.login(AuthService.username(), AuthService.password());
        })
        .error(function(response){
        //    alert("There was a hole");
        });
    });



    var teamID = parseInt(AuthService.teamID());
    var routeCountForMyTeam = 0;
    $scope.onBusRoute = false;

    if(teamID != 0){
        $http.get("/api/route/teamId/" + teamID).then(function(response){
            routeCountForMyTeam = response.data.length;

            if(routeCountForMyTeam > 0){
                for(var i = 0; i < routeCountForMyTeam; i++){
                    var type = response.data[i].type;
                    var typeBitmap = type.toString(2).split("");


                    if(typeBitmap.length >= 3){
                        if(typeBitmap[2] == "1"){
                            $scope.onBusRoute = true;
                            break;
                        }
                    }
                }
            }
        });
    }



    //console.log($scope.role);

})

.controller('Waiver', function($scope, $stateParams, $http, $ionicPopup, $timeout, $state, $ionicViewService, AuthService) {
    // An alert dialog
    console.log($stateParams);
    $scope.registerData = $stateParams.registerData;
    console.log($scope.registerData);
    $scope.teamCaptain = $stateParams.teamCaptain;
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
        if($scope.teamCaptain===true) {
            //create team first
        } else {
            $http.post("/api/participants/",
            {
                "name": $scope.registerData.firstname + " " + $scope.registerData.lastname,
                "type": 1,
                "email": $scope.registerData.email,
                "username": $scope.registerData.username,
                "password": $scope.registerData.password,
                "teamId": null,
                "accessibleStatus": $scope.registerData.accessibilityNeeds,
                "studentStatus": 0,
                "busStatus": 0,
                "participantStatus": 1
            }
        ).then(function(response){
            console.log(response);
            AuthService.login($scope.registerData.username, $scope.registerData.password);
            $ionicViewService.nextViewOptions({
                disableBack: true
            });
            $state.go("app.home", {}, {"location": "replace"});
        });
    }
};
})

.controller('Register', function($scope, $stateParams, $state, AuthService) {
    $scope.registerData = {};
    $scope.registerData.teamPrivacy = "public";
    $scope.teamCaptain = $stateParams.teamCaptain;
    $scope.register = function(registerForm) {
        if(!registerForm.$valid) {
            return;
        } else {
            console.log($scope.registerData);
            $state.go("app.waiver",{"registerData": $scope.registerData, "teamCaptain": $scope.teamCaptain});
        }
    };
});
