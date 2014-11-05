'use strict';

angular.module('rebroApp')

    .factory('CommandFactory', function() {

        var constructors = {
            setX: function(varTable, value) {
                this.execute = function() {
                    varTable.setVar('spriteX', Number(value));
                }
            },
            setY: function(varTable, value) {
                this.execute = function() {
                    varTable.setVar('spriteY', Number(value));
                }
            },
            moveX: function(varTable, value) {
                this.execute = function() {
                    value = varTable.getVar('spriteX') + Number(value);
                    varTable.setVar('spriteX', value);
                }
            },
            moveY: function(varTable, value) {
                this.execute = function() {
                    value = varTable.getVar('spriteY') + Number(value);
                    varTable.setVar('spriteY', value);
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
