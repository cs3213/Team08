'use strict';

angular.module('rebroApp')

    .factory('CommandFactory', function(Expression) {

        var constructors = {
            setX: function(varTable, value) {
                this.execute = function() {
                    varTable.setValue(varTable.VAR_POSITION_X, Number(value));
                }
            },
            setY: function(varTable, value) {
                this.execute = function() {
                    varTable.setValue(varTable.VAR_POSITION_Y, Number(value));
                }
            },
            moveX: function(varTable, value) {
                this.execute = function() {
                    var result = varTable.getValue(varTable.VAR_POSITION_X) + Number(value);
                    varTable.setValue(varTable.VAR_POSITION_X, result);
                }
            },
            moveY: function(varTable, value) {
                this.execute = function() {
                    var result = varTable.getValue(varTable.VAR_POSITION_Y) + Number(value);
                    varTable.setValue(varTable.VAR_POSITION_Y, result);
                }
            },
            assign: function(varTable, lhsVarName, rhsExpr) {
                this.execute = function() {
                    var result = Expression.evaluate(rhsExpr);
                    varTable.setValue(lhsVarName, result);
                }
            },
            changeCostume: function(character, value) {
                this.execute = function() {
                    character.costume = value;
                }
            },
            show: function(character) {
                this.execute = function() {
                    character.isVisible = true;
                }
            },
            hide: function(character) {
                this.execute = function() {
                    character.isVisible = false;
                }
            }
        };

        return {
            createCommand: function(name, receiver, args) {
                if (!constructors.hasOwnProperty(name)) {
                    throw new Error('Command "' + name + '" is undefined');
                }

                var command = {};
                constructors[name].apply(command, [receiver].concat(args));

                return command;
            }
        };

    });
