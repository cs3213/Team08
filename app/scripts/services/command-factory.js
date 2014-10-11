'use strict';

angular.module('rebroApp')

    .factory('CommandFactory', function(Character) {
        var constructors = {
            setX: function(receiver, value) {
                this.execute = function() {
                    receiver.xPos = value;
                }
            },

            setY: function(receiver, value) {
                this.execute = function() {
                    receiver.yPos = value;
                }
            },

            moveX: function(receiver, value) {
                this.execute = function() {
                    receiver.xPos += value;
                }
            },

            moveY: function(receiver, value) {
                this.execute = function() {
                    receiver.yPos += value;
                }
            },

            changeCostume: function(receiver, value) {
                this.execute = function() {
                    receiver.costume = value;
                }
            },

            show: function(receiver) {
                this.execute = function() {
                    receiver.isVisible = true;
                }
            },

            hide: function(receiver) {
                this.execute = function() {
                    receiver.isVisible = false;
                }
            }
        };

        return {
            createCommand: function(name, receiver, args) {

                if (!constructors.hasOwnProperty(name)) {
                    throw new Error('Command "' + name + '" is undefined');

                } else if (receiver instanceof Character === false) {
                    throw new Error('Receiver must be an instance of Character');
                }

                var command = {};
                constructors[name].apply(command, [receiver].concat(args));

                return command;
            }
        };
    });
