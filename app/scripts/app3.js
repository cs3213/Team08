var myapp = angular.module('rebroApp', ['tg.dynamicDirective','ui.sortable']);

myapp.controller('masterCtrl', function($scope) {
    $scope.model = {};
    $scope.drawer = {};
});

myapp.controller('saveCtrl', function($scope) {
 
        $scope.insertJFile = function (){
        console.log(angular.toJson($scope.model.program.stmtList, true));
   insertFile(angular.toJson($scope.model.program.stmtList, true));
        //$scope.insertFile(angular.toJson($scope.model.program.stmtList, true));
   };  
      
});

myapp.controller('sortableController', function ($scope, $interval, Program, Statement, Character, CompilerSvc) {
    /******* INITIALIZATION ************/
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
    
    var changeCostume = new Statement('changeCostume', 'costume-brainy');
    changeCostume.hasValue = true;
    changeCostume.hasList = false;
    
    var repeat = new Statement('repeat', '1');
    repeat.hasValue = true;
    repeat.hasList = true;

    $scope.drawer.statements = [setX, setY, moveX, moveY, hide, show, changeCostume, repeat];
    
     $scope.drawer.statementsBackup = angular.copy($scope.drawer.statements);
    
     $scope.change = function() {
        $scope.drawer.statements = [];
        $scope.drawer.statements = angular.copy($scope.drawer.statementsBackup);
      };
    
 // $scope.items = $scope.rootItem.items;
    $scope.sortableOptions = {
    helper: "clone",
    connectWith: ".editor",
     start:function(event,ui){
            $(ui.item).show();
             $scope.drawer.statements = angular.copy($scope.drawer.statementsBackup);
    },
    stop:function(event, ui){
             $(ui.item).remove();
    }
  };
    
    $scope.sortableOptions2 = {
   // placeholder: "app",
    connectWith: ".editor",
	receive: function(event, ui)
	{
		sortableIn = 1;
	},
	over: function(event, ui)
	{
		sortableIn = 1;
	},
	out: function(event, ui)
	{
		sortableIn = 0;
	},
	beforeStop: function(event, ui)
	{
		if (sortableIn == 0)
		{
            // alert($(ui.item).index());
            var i = $(ui.item).index();
          $(ui.item).remove();
       /*  $scope.model.program.stmtList = $scope.model.program.stmtList.splice(i, 1);
          $scope.$apply; 
            */
		}
	}
  };
    
    $scope.getView = function(item){
     if(item.hasList){  
        return "nest_Item.html";
     }
        return null;
    };
    

});