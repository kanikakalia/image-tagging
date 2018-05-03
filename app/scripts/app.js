'use strict';

/**
 * @ngdoc overview
 * @name imageTaggingApp
 * @description
 * # imageTaggingApp
 *
 * Main module of the application.
 */
angular
  .module('imageTaggingApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngImgMap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
         controller: 'DemoCtrl'
        // controllerAs: 'm'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  
