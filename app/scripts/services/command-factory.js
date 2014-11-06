'use strict';

angular.module('rebroApp')

    .factory('CommandFactory', function() {

        var constructors = {
            setX: function(varTable, value) {
                this.execute = function() {
                    varTable.setValue(varTable.VAR_CHARACTER_X, Number(value));
                }
            },
            setY: function(varTable, value) {
                this.execute = function() {
                    varTable.setValue(varTable.VAR_CHARACTER_Y, Number(value));
                }
            },
            moveX: function(varTable, value) {
                this.execute = function() {
                    var result = varTable.getValue(varTable.VAR_CHARACTER_X) + Number(value);
                    varTable.setValue(varTable.VAR_CHARACTER_X, result);
                }
            },
            moveY: function(varTable, value) {
                this.execute = function() {
                    var result = varTable.getValue(varTable.VAR_CHARACTER_Y) + Number(value);
                    varTable.setValue(varTable.VAR_CHARACTER_Y, result);
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
