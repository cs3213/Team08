'use strict';

angular.module('rebroApp')

    .factory('Runner', function($interval) {

        var isRunning = false;
        var stack = [];
        var intervalPromise;
        var refreshRate = 20;

        function StatementPointer(stmtList, repeatCount) {
            this.stmtList = stmtList;
            this.index = 0;
            this.repeatsLeft = repeatCount - 1;
            this.repeatsForever = repeatCount < 0;
        }

        function peekStack() {
            if (stack.length === 0) {
                return null;
            } else {
                return stack[stack.length - 1];
            }
        }

        return {
            isRunning: function() {
                return isRunning;
            },

            runProgram: function(executable) {
                if (isRunning) {
                    return;
                }

                isRunning = true;
                stack = [];
                stack.push(new StatementPointer(executable.stmtList, 0));

                intervalPromise = $interval(function () {
                    var ptr = peekStack();

                    if (ptr.index < ptr.stmtList.length) {
                        var stmt = ptr.stmtList[ptr.index];

                        if (stmt.type === 'repeat') {
                            var repeatCount = stmt.args[0];
                            stack.push(new StatementPointer(stmt.stmtList, repeatCount));
                            //redo

                        } else if (stmt.type === 'forever') {
                            stack.push(new StatementPointer(stmt.stmtList, -1));
                            //redo

                        //} else if (stmt.type === 'if') {


                        } else {
                            stmt.command.execute();
                        }

                        ptr.index++;

                    } else if (ptr.repeatsLeft > 0) {
                        ptr.index = 0;
                        ptr.repeatsLeft--;
                        //redo

                    } else if (ptr.repeatsForever) {
                        ptr.index = 0;
                        //redo

                    } else if (stack.length > 1) {
                        stack.pop();
                        //redo

                    } else {
                        $interval.cancel(intervalPromise);
                        isRunning = false;
                    }
                }, refreshRate);

                return intervalPromise;
            },

            stopProgram: function() {
                $interval.cancel(intervalPromise);
                isRunning = false;
            }
        };

    });
