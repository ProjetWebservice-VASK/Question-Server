'use strict';

/**
 * @ngdoc overview
 * @name questionServerApp
 * @description
 * # questionServerApp
 *
 * Main module of the application.
 */
angular
  .module('questionServerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
	.when('/contact', {
	 templateUrl: 'views/contact.html',
	 controller: 'ContactCtrl'
	})
      .otherwise({
        redirectTo: '/'
      });
  });