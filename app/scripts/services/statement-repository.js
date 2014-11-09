'use strict';

angular.module('rebroApp')

    .factory('StatementRepository', function (Statement, CommandType) {

        var templates = [
            new Statement(CommandType.FOREVER, true),
            new Statement(CommandType.REPEAT, true, '1'),
            new Statement(CommandType.WHILE, 'true', [null]),
            new Statement(CommandType.IF, 'true', [null]),
            new Statement(CommandType.SET_VAR, false, null, [null]),
            new Statement(CommandType.SET_X, false, 0),
            new Statement(CommandType.SET_Y, false, 0),
            new Statement(CommandType.MOVE_X, false, 1),
            new Statement(CommandType.MOVE_Y, false, 1),
            new Statement(CommandType.HIDE, false),
            new Statement(CommandType.SHOW, false),
            new Statement(CommandType.CHANGE_COSTUME, false, 'brainy')
        ];

        templates[2].expressionList = templates[2].args[0];
        templates[3].expressionList = templates[3].args[0];
        templates[4].expressionList = templates[4].args[1];

        return {
            getStatementTemplates: function() {
                return angular.copy(templates);
            }
        };

    });
