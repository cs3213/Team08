var myapp = angular.module('rebroApp', ['tg.dynamicDirective', 'ui.sortable', 'ui.bootstrap']);

myapp.controller('masterCtrl', function ($scope) {
    $scope.model = {};
    $scope.drawer = {};

});

myapp.controller('headerCtrl', function ($scope, Program, Character, VarTable) {
    $scope.newProgram = function () {
        $scope.model.character = new Character();
        //$scope.model.program = new Program();
        $scope.model.program.stmtList = [];

    };

    $scope.createJPicker = function () {
        createPicker();
    };

    $scope.insertJFile = function () {
        insertFile(angular.toJson([VarTable.getUserVarNames(),$scope.model.program.stmtList], true));
    };

});

myapp.controller('sortableController', function ($scope, Program, Statement, Character, Compiler, Runner, StatementRepository, VarTable) {
    /******* INITIALIZATION ************/
    $scope.model.character = new Character();
    $scope.model.program = new Program();

    $scope.loadProgram = function (text) {
        var  temp = angular.fromJson(text);
        for (var i = 0; i < temp[0].length; i++) {
            VarTable.addVarName(temp[0][i]);
        }
   
        $scope.$apply(function(){
            $scope.model.program.stmtList = angular.copy(temp[1]);
        });
    }

    $scope.addVariable = function(args){
        VarTable.addVarName(args);
    }

     $scope.deleteVariable = function(args){
        VarTable.removeVarName(args);
    }

    $scope.hasArgs = function(args) {
        return args.length > 0;
    };

    $scope.onPlay = function () {
        var receiver = $scope.model.character;
        var build = CompilerSvc.compile($scope.model.program, receiver);

        // some temp reset code
        receiver.xPos = 0;
        receiver.yPos = 0;
        receiver.isVisible = true;

        $scope.intervalPromise = RunnerSvc.runProgram(build);
    };

    $scope.onStop = function () {
        RunnerSvc.stopProgram($scope.intervalPromise);
    };

    $scope.drawer.statements = StatementRepository.getStatementTemplates();

    $scope.operators = ['+', '-', '*', '/', '%'];

    $scope.booleanOper = ['>', '<', '==', '>=', '<=', '!='];

    $scope.allOperators = $scope.operators.concat($scope.booleanOper);

    $scope.programVariables = function(){
        return VarTable.getUserVarNames().concat(VarTable.getReservedVarNames());
    };

    // $scope.items = $scope.rootItem.items;
    $scope.sortableOptions = {
        helper: "clone",
        connectWith: [".editor", ".repeat"],

        start: function (event, ui) {
            $(ui.item).show();
            $scope.drawer.statements = StatementRepository.getStatementTemplates();
        },
        stop: function (event, ui) {
            $(ui.item).remove();
        }
    };

    $scope.sortableOptions2 = {
        //placeholder: "app",
        connectWith: [".editor", ".repeat"]
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
    $scope.getViewRepeat = function (item) {
        if (item) {
            return "nest_Item2.html";
        }
        return null;
    };

    $scope.getView = function (item) {
         if (item) {
            return "nest_Item.html";
        }
        return null;
    };
});

var secretEmptyKey = '[$empty$]';

myapp.directive('emptyTypeahead', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            // this parser run before typeahead's parser
            modelCtrl.$parsers.unshift(function (inputValue) {
                var value = (inputValue ? inputValue : secretEmptyKey); // replace empty string with secretEmptyKey to bypass typeahead-min-length check
                modelCtrl.$viewValue = value; // this $viewValue must match the inputValue pass to typehead directive
                return value;
            });

            // this parser run after typeahead's parser
            modelCtrl.$parsers.push(function (inputValue) {
                return inputValue === secretEmptyKey ? '' : inputValue; // set the secretEmptyKey back to empty string
            });
        }
    }
})
myapp.controller('TypeaheadCtrl', function ($scope, $http, $timeout) {

    $scope.stateComparator = function (state, viewValue) {
        return viewValue === secretEmptyKey || ('' + state).toLowerCase().indexOf(('' + viewValue).toLowerCase()) > -1;
    };

    $scope.onFocus = function (e) {
        $timeout(function () {
            $(e.target).trigger('input');
            $(e.target).trigger('change'); // for IE
        });
    };

    // Assumption: Only 'assign' or 'if' can use this function
    $scope.addOperation = function(stmt) {
        if (stmt.type === 'assign' || stmt.type === 'if') {
            stmt.expressionList.push(undefined);
            stmt.expressionList.push(undefined);
        }
    };

    // Assumption: Only 'assign' or 'if' can use this function
    $scope.removeOperation = function(stmt) {
        if (stmt.type === 'assign' || stmt.type === 'if') {
            if (stmt.expressionList.length > 2) {
                stmt.expressionList.pop();
                stmt.expressionList.pop();
            }
        }
    };

});
