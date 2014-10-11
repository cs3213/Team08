'use strict';

angular.module('rebroApp')
    .factory('CompilerSvc', function(CommandFactory) {

        function compileRecursively(numTimes, stmtList, receiver, execList) {

            for (var i = 0; i < numTimes; i++) {
                for (var j = 0; j < stmtList.length; j++) {
                    compileStatement(stmtList[j], receiver, execList);
                }
            }

            return execList;
        }

        function compileStatement(stmt, receiver, execList) {

            if (stmt.type === 'repeat') {
                compileRecursively(stmt.args[0], stmt.stmtList, receiver, execList);

            } else {
                var command = CommandFactory.createCommand(stmt.type, receiver, stmt.args);
                execList.push(command);
            }
        }

        return {
            compile: function(program, receiver) {
                return compileRecursively(1, program.stmtList, receiver, []);
            }
        };
    });
