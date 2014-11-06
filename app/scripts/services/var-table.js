'use strict';

angular.module('rebroApp')

    .factory('VarTable', function() {

        var ReservedVar = {
            CHARACTER_X: '_characterX',
            CHARACTER_Y: '_characterY'
        };

        var defaultValues = {};
        defaultValues[ReservedVar.CHARACTER_X] = 0;
        defaultValues[ReservedVar.CHARACTER_Y] = 0;

        var reservedVars = angular.copy(defaultValues);
        var userVars = {};

        return {
            VAR_CHARACTER_X: ReservedVar.CHARACTER_X,
            VAR_CHARACTER_Y: ReservedVar.CHARACTER_Y,

            getReservedVarNames: function() {
                var varNames = [];
                for (var name in reservedVars) {
                    varNames.push(name);
                }
                return varNames;
            },

            getUserVarNames: function() {
                var varNames = [];
                for (var name in userVars) {
                    varNames.push(name);
                }
                return varNames;
            },

            addVarName: function(name) {
                userVars[name] = 0;
            },

            removeVarName: function(name) {
                delete userVars[name];
            },

            initValues: function() {
                var name;
                for (name in reservedVars) {
                    reservedVars[name] = 0;
                }
                for (name in userVars) {
                    userVars[name] = 0;
                }
            },

            clearTable: function() {
                reservedVars = angular.copy(defaultValues);
                userVars = {};
            },

            getValue: function(name) {
                if (reservedVars.hasOwnProperty(name)) {
                    return reservedVars[name];
                } else if (userVars.hasOwnProperty(name)) {
                    return userVars[name];
                } else {
                    // error
                }
            },

            setValue: function(name, value) {
                if (reservedVars.hasOwnProperty(name)) {
                    reservedVars[name] = value;
                } else if (userVars.hasOwnProperty(name)) {
                    userVars[name] = value;
                } else {
                    // error
                }
            }
        };
    });
