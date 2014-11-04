'use strict';

angular.module('rebroApp')
    .factory('CompilerSvc', function(CommandFactory) {

        var foreverIndex;
        var foreverNest;

        function compileRecursively(numTimes, stmtList, receiver, execList, nestLevel) {

            for (var i = 0; i < numTimes; i++) {
                for (var j = 0; j < stmtList.length; j++) {
                    compileStatement(stmtList[j], receiver, execList, nestLevel);

                    if (nestLevel <= foreverNest) {
                        break;;
                    }
                }
            }

            return execList;
        }

        function compileForever(stmtList, receiver, execList, nestLevel) {

            for (var j = 0; j < stmtList.length; j++) {
                compileStatement(stmtList[j], receiver, execList, nestLevel);

                if (nestLevel < foreverNest) {
                    break;
                }
            }

            return execList;
        }

        function compileStatement(stmt, receiver, execList, nestLevel) {

            if (stmt.type === 'repeat') {
                compileRecursively(stmt.args[0], stmt.stmtList, receiver, execList, nestLevel + 1);

            } else if (stmt.type === 'forever') {
                foreverIndex = execList.length;
                foreverNest = nestLevel + 1;
                compileForever(stmt.stmtList, receiver, execList, nestLevel + 1);

            } else {
                var command = CommandFactory.createCommand(stmt.type, receiver, stmt.args);
                execList.push(command);
            }
        }

        return {
            compile: function(program, receiver) {
                foreverNest = -1;
                foreverIndex = -1;  // no forever looping initially

                var build = {};
                build.executableList = compileRecursively(1, program.stmtList, receiver, [], 0);
                build.foreverIndex = foreverIndex;
                build.loopsForever = function() {
                    return foreverIndex >= 0;
                };

                return build;
            }
        };
    });
