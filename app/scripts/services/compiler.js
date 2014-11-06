'use strict';

angular.module('rebroApp')

    .factory('Compiler', function(CommandFactory, VarTable) {

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
                    case 'show':
                    case 'hide':
                    case 'changeCostume':
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

/*
 compile: function(program, receiver) {
 loopsForever = false;
 foreverIndex = -1;  // no forever looping initially
 foreverNestLevel = -1;
 VarTable.loadVars(program.variables);
 // reset vartable = program variables

 var build = {};
 build.executableList = compileRecursively(1, program.stmtList, receiver, [], 0);
 build.loopsForever = loopsForever;
 build.foreverIndex = foreverIndex;
 build.hasEmptyForever = function() {
 return this.foreverIndex >= this.executableList.length;
 };

 return build;
 },

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
}*/
