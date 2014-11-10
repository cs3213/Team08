'use strict';

angular.module('rebroApp')

    .factory('CommandFactory', function (CommandType, Expression) {

        var Command = {};
        Command[CommandType.SET_X] = function (varTable, value) {
            this.execute = function () {
                varTable.setValue(varTable.VAR_POSITION_X, Expression.evaluate([value]));
            };
        };
        Command[CommandType.SET_Y] = function (varTable, value) {
            this.execute = function () {
                varTable.setValue(varTable.VAR_POSITION_Y, Expression.evaluate([value]));
            };
        };
        Command[CommandType.MOVE_X] = function (varTable, value) {
            this.execute = function () {
                var result = varTable.getValue(varTable.VAR_POSITION_X) + Expression.evaluate([value]);
                varTable.setValue(varTable.VAR_POSITION_X, result);
            };
        };
        Command[CommandType.MOVE_Y] = function (varTable, value) {
            this.execute = function () {
                var result = varTable.getValue(varTable.VAR_POSITION_Y) + Expression.evaluate([value]);
                varTable.setValue(varTable.VAR_POSITION_Y, result);
            };
        };
        Command[CommandType.SET_VAR] = function (varTable, lhsVarName, rhsExpr) {
            this.execute = function () {
                var result = Expression.evaluate(rhsExpr);
                varTable.setValue(lhsVarName, result);
            };
        };
        Command[CommandType.CHANGE_COSTUME] = function (character, value) {
            this.execute = function () {
                character.costume = value;
            };
        };
        Command[CommandType.SHOW] = function (character) {
            this.execute = function () {
                character.isVisible = true;
            };
        };
        Command[CommandType.HIDE] = function (character) {
            this.execute = function () {
                character.isVisible = false;
            };
        };

        return {
            createCommand: function (name, receiver, args) {
                if (!Command.hasOwnProperty(name)) {
                    throw new Error('Command "' + name + '" is undefined');
                }

                var command = {};
                Command[name].apply(command, [receiver].concat(args));

                return command;
            }
        };

    });
