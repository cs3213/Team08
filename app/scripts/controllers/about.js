'use strict';

/**
 * @ngdoc function
 * @name rebroApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rebroApp
 */
angular.module('rebroApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
