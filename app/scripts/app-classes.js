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
        this.costume = 'default';
        this.isVisible = true;
    })

    .value('CommandType', {
        FOREVER: 'Forever',
        REPEAT: 'Repeat',
        WHILE: 'While',
        IF: 'If',
        SET_VAR: 'Set Var',
        SET_X: 'Set X',
        SET_Y: 'Set Y',
        MOVE_X: 'Move X',
        MOVE_Y: 'Move Y',
        HIDE: 'Hide',
        SHOW: 'Show',
        CHANGE_COSTUME: 'Change Costume'
    });
