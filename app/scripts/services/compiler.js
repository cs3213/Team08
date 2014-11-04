'use strict';

angular.module('rebroApp')
    .factory('CompilerSvc', function(CommandFactory) {

        var loopsForever;
        var foreverIndex;
        var foreverNestLevel;

        function compileRecursively(numTimes, stmtList, receiver, execList, nestLevel) {

            for (var i = 0; i < numTimes; i++) {
                for (var j = 0; j < stmtList.length; j++) {
                    compileStatement(stmtList[j], receiver, execList, nestLevel);

                    if (nestLevel < foreverNestLevel) {
                        return execList;
                    }
                }
            }

            return execList;
        }

        function compileForever(stmtList, receiver, execList, nestLevel) {

            for (var j = 0; j < stmtList.length; j++) {
                compileStatement(stmtList[j], receiver, execList, nestLevel);

                if (nestLevel < foreverNestLevel) {
                    break;
                }
            }

            return execList;
        }

        function compileStatement(stmt, receiver, execList, nestLevel) {

            if (stmt.type === 'repeat') {
                compileRecursively(stmt.args[0], stmt.stmtList, receiver, execList, nestLevel + 1);

            } else if (stmt.type === 'forever') {
                loopsForever = true;
                foreverIndex = execList.length;
                foreverNestLevel = nestLevel + 1;
                compileForever(stmt.stmtList, receiver, execList, nestLevel + 1);

            } else {
                var command = CommandFactory.createCommand(stmt.type, receiver, stmt.args);
                execList.push(command);
            }
        }

        return {
            compile: function(program, receiver) {
                loopsForever = false;
                foreverNestLevel = -1;
                foreverIndex = -1;  // no forever looping initially

                var build = {};
                build.executableList = compileRecursively(1, program.stmtList, receiver, [], 0);
                build.foreverIndex = foreverIndex;
                build.loopsForever = loopsForever;
                build.hasEmptyForever = function() {
                    return this.foreverIndex >= this.executableList.length;
                };

                return build;
            }
        };
    });
