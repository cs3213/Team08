var myapp = angular.module('rebroApp', ['tg.dynamicDirective','ui.sortable']);

myapp.controller('masterCtrl', function($scope) {
    $scope.model = {};
    $scope.drawer = {};
    $scope.lala=function(){
      $scope.model.xxx = angular.toJson($scope.model.program) + "</br>";
    };
    
});

myapp.controller('headerCtrl', function($scope, Program, Character) {
      $scope.newProgram = function (){
            $scope.model.character = new Character();
            $scope.model.program = new Program();
       
      };
    
    $scope.createJPicker = function(){
           createPicker();
    };
    
        $scope.insertJFile = function (){
         insertFile(angular.toJson($scope.model.program.stmtList, true));
        //$scope.insertFile(angular.toJson($scope.model.program.stmtList, true));
   };  
      
});

myapp.controller('sortableController', function ($scope, $interval, Program, Statement, Character, CompilerSvc, StatementRepository) {
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

    $scope.drawer.statements = StatementRepository.getStatementTemplates();
    

    
 // $scope.items = $scope.rootItem.items;
    $scope.sortableOptions = {
    helper: "clone",
    connectWith: [".editor",".repeat"],
    
     start:function(event,ui){
           $(ui.item).show();
           $scope.drawer.statements = StatementRepository.getStatementTemplates();
    },
    stop:function(event, ui){
             $(ui.item).remove();
    }
  };
    
    $scope.sortableOptions2 = {
    //placeholder: "app",
     connectWith: [".editor",".repeat"]
	/*receive: function(event, ui)
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
            
		}
	}*/
        
        
  };

  $scope.colors = [
      {name:'black', shade:'dark'},
      {name:'white', shade:'light'},
      {name:'red', shade:'dark'},
      {name:'blue', shade:'dark'},
      {name:'yellow', shade:'light'}
    ];
    
    $scope.programVariables=[
                {name:'x', value:'5'},
            {name:'black', value:'5'}
            
            
    ];
    
    $scope.getViewRepeat = function(item){
     if(item)   {
        return "nest_Item2.html";   
     }
        return null;
    };
        
    $scope.getView = function(item){
    if(item){
        return "nest_Item.html";   
     }
        return null;
       };
    

});