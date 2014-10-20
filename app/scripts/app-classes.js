'use strict';

angular.module('rebroApp')

    .value('Program', function() {
        this.stmtList = [];
    })

    .value('Statement', function(type) {
        this.type = type;
        this.args = [];
        this.stmtList = [];

        for (var i = 1; i < arguments.length; i++) {
            this.args.push(arguments[i]);
        }
    })

    .value('Character', function() {
        this.xPos = 0;
        this.yPos = 0;
        this.costume = "costume-default";
        this.isVisible = true;
    });
