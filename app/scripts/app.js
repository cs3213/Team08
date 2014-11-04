var myapp = angular.module('rebroApp', ['tg.dynamicDirective','ui.sortable','ui.bootstrap']);

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

myapp.controller('sortableController', function ($scope, Program, Statement, Character, CompilerSvc, RunnerSvc, StatementRepository) {
    /******* INITIALIZATION ************/
    $scope.model.character = new Character();
    $scope.model.program = new Program();
    
    $scope.onPlay = function() {
        var receiver = $scope.model.character;
        var build = CompilerSvc.compile($scope.model.program, receiver);
        
        // some temp reset code
        receiver.xPos = 0;
        receiver.yPos = 0;
        receiver.isVisible = true;

        $scope.intervalPromise = RunnerSvc.runProgram(build);
    };

    $scope.onStop = function() {
        RunnerSvc.stopProgram($scope.intervalPromise);
    };

    $scope.drawer.statements = StatementRepository.getStatementTemplates();
       
    $scope.operators= ['+', '-', '*', '/', '%'];
    
    $scope.programVariables=[
            {name:'x', value:'5'},
            {name:'black', value:'5'}
            
            
    ];
    
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