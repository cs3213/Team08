var myapp = angular.module('sortableApp', ['ui.sortable']);

myapp.controller('sortableController', function ($scope) {
  var tmpList = [];
   $scope.list1 = [];
   $scope.list2 = [];
    
     $scope.statements = [
        {
            'name': 'setX',
            'val': 0,
            'drag': true,
            'hasValue': true,
            'hasList': false           
        },
        {
            'name': 'setY',
            'val': 0,
            'drag': true,
            'hasValue': true,
            'hasList': false
        },
        {
            'name': 'moveX',
            'val': 0,
            'drag': true,
            'hasValue': true,
            'hasList': false
        },
        {
            'name': 'moveY',
            'val': 0,
            'drag': true,
            'hasValue': true,
            'hasList': false
        },
        {
            'name': 'changeCostume',
            'val': 0,
            'drag': true,
            'hasValue': true,
            'hasList': false
        },
        {
            'name': 'show',
            'drag': true,
            'hasValue': false,
            'hasList': false
        },
        {
            'name': 'hide',
            'drag': true,
            'hasValue': false,
            'hasList': false
            
        },
        {
            'name': 'repeat',
            'drag': true,
            'hasValue': false,
            'hasList': true,
            'statementList': []
        }
    ];
    
     $scope.stmts = angular.copy($scope.statements);
    
     $scope.change = function() {
        $scope.statements = [];
        $scope.statements = angular.copy($scope.stmts);
      };
    
 // $scope.items = $scope.rootItem.items;
    $scope.sortableOptions = {
    placeholder: "app",
    connectWith: ".editor"
  };
  
});