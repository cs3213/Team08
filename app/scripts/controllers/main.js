'use strict';

/**
 * @ngdoc function
 * @name rebroApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rebroApp
 */
angular.module('rebroApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
