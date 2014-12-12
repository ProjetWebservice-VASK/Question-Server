'use strict';

/**
 * @ngdoc function
 * @name questionServerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the questionServerApp
 */
angular.module('questionServerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
