var myapp = angular.module('rebroApp', ['tg.dynamicDirective','ui.sortable']);

myapp.controller('sortableController', function ($scope, $interval, Program, Statement, Character, CompilerSvc) {
  var tmpList = [];
   $scope.list1 = [];
   $scope.list2 = [];
    
    /******* INITIALIZATION ************/
    $scope.model = {};
    $scope.model.character = new Character();
    $scope.model.program = new Program();
    
    $scope.onPlay = function() {
        var receiver = $scope.model.character;
        var executableList = CompilerSvc.compile($scope.model.program, receiver);
        
        // some temp reset code
        receiver.xPos = 0;
        receiver.yPos = 0;
        receiver.isVisible = true;

        //Perhaps a RunnerSvc
        $scope.myTempCount = 0;
        var intervalPromise = $interval(function () {
            var i = $scope.myTempCount;
            if (i < executableList.length) {
                executableList[i].execute();
               // $scope.stub.execMsg = $scope.stub.msgs[i];
                $scope.myTempCount++;
            } else {
                $interval.cancel(intervalPromise);
            }
        }, 200);
    };
    /************************************/
    var setX = new Statement('setX', 0);
    setX.hasValue = true;
    setX.hasList = false;
    
    var setY = new Statement('setY', 0);
    setY.hasValue = true;
    setY.hasList = false;
    
    var moveX = new Statement('moveX', 0);
    moveX.hasValue = true;
    moveX.hasList = false;
    
    var moveY = new Statement('moveY', 0);
    moveY.hasValue = true;
    moveY.hasList = false;
    
    var hide = new Statement('hide', 0);
    hide.hasValue = false;
    hide.hasList = false;
    
    var show = new Statement('show', 0);
    show.hasValue = false;
    show.hasList = false;
    
    var changeCostume = new Statement('changeCostume', 'default-url');
    changeCostume.hasValue = true;
    changeCostume.hasList = false;
    
    var repeat_1 = new Statement('repeat', '1');
    repeat_1.hasValue = true;
    repeat_1.hasList = true;
    
    var repeat_2 = new Statement('repeat', '1');
    repeat_2.hasValue = true;
    repeat_2.hasList = true;
    
    $scope.drawer = {};
    $scope.drawer.statements = [setX, setY, moveX, moveY, hide, show, changeCostume, repeat_1, repeat_2];
    
     $scope.drawer.statementsBackup = angular.copy($scope.drawer.statements);
    
     $scope.change = function() {
        $scope.drawer.statements = [];
        $scope.drawer.statements = angular.copy($scope.drawer.statementsBackup);
      };
    
 // $scope.items = $scope.rootItem.items;
    $scope.sortableOptions = {
    placeholder: "app",
    connectWith: ".apps-container"

  };
    
    $scope.getView = function(item){
     if(item.hasList){  
        return "nest_Item.html";
     }
        return null;
    };
  
});