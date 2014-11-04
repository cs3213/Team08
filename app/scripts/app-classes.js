'use strict';

angular.module('rebroApp')

    .value('Program', function() {
        this.stmtList = [];
    })

    .value('Statement', function(type, isContainer) {
        this.type = type;
        this.isContainer = isContainer;
        this.args = [];
        this.stmtList = [];

        this.hasArgs = function() {
            return this.args.length > 0;
        };
        if(type === 'assign'){
            this.args[1].push()

        };


        for (var i = 2; i < arguments.length; i++) {
            this.args.push(arguments[i]);
        }

        this.addOperation = function(){


        };
    })

    .value('Character', function() {
        this.xPos = 0;
        this.yPos = 0;
        this.costume = "costume-default";
        this.isVisible = true;
    });
