'use strict';

angular.module('rebroApp')

    .value('Program', function() {
        this.userVars = [];
        this.stmtList = [];
    })

    .value('Statement', function(type, isContainer) {
        this.type = type;
        this.isContainer = isContainer;
        this.args = [];
        this.stmtList = [];

        for (var i = 2; i < arguments.length; i++) {
            this.args.push(arguments[i]);
        }
    })

    .value('Character', function() {
        this.xPos = 0;
        this.yPos = 0;
        this.costume = "costume-default";
        this.isVisible = true;
    });
