var app = angular.module('app', ['ngRoute', 'appControllers']);

var appControllers = angular.module('appControllers', []);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/login', {
    templateUrl: 'views/login.html',
    controller:'LoginController'
  }).
  when('/register', {
    templateUrl: 'views/register.html',
    controller:'RegistrationController'
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);