'use strict';

var secretEmptyKey = '[$empty$]';

angular.module('rebroApp', ['tg.dynamicDirective', 'ui.sortable', 'ui.bootstrap'])

    .controller('masterCtrl', function ($rootScope, VarTable, Program, Character) {
        $rootScope.drawer = {}
        $rootScope.varTable = VarTable;
        $rootScope.model = {};
        $rootScope.model.character = new Character();
        $rootScope.model.program = new Program();
    })

    .controller('headerCtrl', function ($scope, Program, Character, VarTable) {
        $scope.newProgram = function () {
            $scope.model.character = new Character();
            $scope.model.program.stmtList = [];
            VarTable.initValues();
        };
        $scope.createJPicker = function () {
            createPicker();
        };
        $scope.insertJFile = function () {
            insertFile(angular.toJson([VarTable.getUserVarNames(), $scope.model.program.stmtList], true));
        };
    })

    .controller('sortableController', function ($scope, VarTable, Compiler, Runner, StatementRepository, Expression) {
        /******* INITIALIZATION ************/
        $scope.loadProgram = function (text) {
            VarTable.clearTable();
            var temp = angular.fromJson(text);
            for (var i = 0; i < temp[0].length; i++) {
                VarTable.addVarName(temp[0][i]);
            }

            $scope.$apply(function () {
                $scope.model.program.stmtList = angular.copy(temp[1]);
            });
        };

        $scope.addVariable = function (args) {
            VarTable.addVarName(args);
        };

        $scope.deleteVariable = function (args) {
            VarTable.removeVarName(args);
        };

        $scope.hasArgs = function (args) {
            return args.length > 0;
        };

        $scope.onPlay = function () {
            if (!Runner.isRunning()) {
                VarTable.initValues();
                $scope.model.character.isVisible = true;
                var executable = Compiler.compile($scope.model.program, $scope.model.character);
                Runner.runProgram(executable);
            }
        };

        $scope.onStop = function () {
            Runner.stopProgram();
        };

        $scope.drawer.statements = StatementRepository.getStatementTemplates();
        $scope.mathOperators = Expression.getMathOperators();
        $scope.allOperators = Expression.getAllOperators();
        $scope.programVariables = function () {
            return VarTable.getAllVarNames();
        };
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
            connectWith: [".editor", ".repeat"]
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
    })


    .directive('emptyTypeahead', function () {
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
    .controller('TypeaheadCtrl', function ($scope, $http, $timeout) {
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
        $scope.addOperation = function (stmt) {
            if (stmt.type === 'assign' || stmt.type === 'if') {
                stmt.expressionList.push(null);
                stmt.expressionList.push(null);
            }
        };
        // Assumption: Only 'assign' or 'if' can use this function
        $scope.removeOperation = function (stmt) {
            if (stmt.type === 'assign' || stmt.type === 'if') {
                if (stmt.expressionList.length > 2) {
                    stmt.expressionList.pop();
                    stmt.expressionList.pop();
                }
            }
        };
    });
