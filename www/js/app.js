// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js



angular.module('starter', ['ionic', 'starter.controllers', 'ngMessages'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


//These are the app "routes"
//State should be a sub state of app, url should be below app as well.
//TemplateURL is the name of the HTML file for the page
//controller is the name of the controller in controllers.js
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html'
      }
    }
  })
  .state('app.team', {
    url: '/team',
    params: {
      'teamId': null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/team.html',
        controller: 'Team'
      }
    }
  })
  .state('app.busWaiver', {
    url: '/busWaiver',
    views: {
      'menuContent': {
        templateUrl: 'templates/busWaiver.html',
        controller: 'busWaiver'
      }
    }
  })
  .state('app.teams', {
    url: '/teams',
    views: {
      'menuContent': {
        templateUrl: 'templates/teams.html',
        controller: 'TeamList'
      }
    }
  })
  .state('app.waiver', {
    url: '/waiver',
    params: {
      'teamCaptain': null,
      'registerData': null,
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/waiver.html',
        controller: 'Waiver'
      }
    }
  })
  .state('app.addroute', {
    url: '/addroute',
    params: {
      'teamId': null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/addroute.html',
        controller: 'addRoute'
      }
    }
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'TrickOrEat'
      }
    }
  })
  .state('app.register', {
    url: '/register',
    params: {
      'teamCaptain': null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: "Register"
      }
    }
  })

  .state('app.notifications', {
    url: '/notifications',
    params: {
      'notifications': null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/notifications.html',
        controller: "Notifications"
      }
    }
  })

  .state('app.livechat', {
    url: '/livechat',
    params: {
      'notifications': null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/livechat.html',
        controller: "LiveChat"
      }
    }
  })

  .state('app.whatweneed', {
    url: '/whatweneed',
    params: {

    },
    views: {
      'menuContent': {
        templateUrl: 'templates/whatweneed.html',
        controller: 'WhatWeNeed'
      }
    }
  })

  .state('app.myaccount', {
    url: '/myaccount',
    params: {
      'notifications': null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/myaccount.html',
        controller: "MyAccount"
      }
    }
  })

  .state('app.route', {
    url: '/route',
    views: {
        'menuContent': {
            templateUrl: 'templates/route.html',
            controller: "Routes"

         }
     }
  });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
