angular.module('starter.controllers', [])
//Main controller for the application
.controller('AppCtrl', function($scope, $ionicModal, $timeout, AuthService) {

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
            "team": [{
                "id": "1",
                "name": "Fried Chicken"
            }]
        },
        {
            "route": "Route 2",
            "team": [{}]
        },
        { 
            "route": "Route 3", "img": "test.png" ,
            "team": [{}]
        },
        {
            "route": "Route 4",
           "team": [
                {"id": "1",
                    "name": "Cheese Omelet"},
                {"id": "2",
                    "name": "Bacon and Eggs"}
            ]
        },
        {
            "route": "Route 5",
            "team": [{}]
        },
        {
            "route": "Route 6",
            "team": [{}]
        },
        {
            "route": "Route 7",
            team: [{
                "id": "1",
                "name": "Rice Crackers",
            }]
        }
    ];

    $scope.data = {
        clientSide: 'ng'
    };

    $scope.onChange = function (item) {
        console.log("Route:", item.team);
    };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.test = [
    {title: "Testing How This Works", id: 1},
  ];
  $scope.temp = "ASDF"
})

.controller('Register', function($scope, $stateParams, $state) {
  $scope.registerData = {};
  $scope.register = function() {
    console.log("Registering with: ", $scope.registerData);
    $state.go("app.home");
  };
});
