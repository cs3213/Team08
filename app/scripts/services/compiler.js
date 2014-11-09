'use strict';

angular.module('rebroApp')

    .factory('Compiler', function(CommandFactory, CommandType, VarTable) {

        var character = null;

        function compileRecursively(stmtList) {
            for (var i = 0; i < stmtList.length; i++) {
                compileStatement(stmtList[i]);
            }
        }

        function compileStatement(stmt) {

            var command = null;

            if (stmt.isContainer) {
                stmt.command = null;
                compileRecursively(stmt.stmtList);

            } else {
                switch (stmt.type) {
                    case CommandType.SHOW:
                    case CommandType.HIDE:
                    case CommandType.CHANGE_COSTUME:
                        command = CommandFactory.createCommand(stmt.type, character, stmt.args);
                        break;

                    default:
                        command = CommandFactory.createCommand(stmt.type, VarTable, stmt.args);
                }

                stmt.command = command;
            }
        }

        return {
            compile: function(program, receiver) {
                character = receiver;
                var executable = angular.copy(program);
                compileRecursively(executable.stmtList);
                return executable;
            }
        };

    });
