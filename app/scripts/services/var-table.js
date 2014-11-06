'use strict';

angular.module('rebroApp')

    .factory('VarTable', function() {

        var defaultValues = {
            '_characterX': 0,
            '_characterY': 0
        };

        var reservedVars = {};
        var userVars = {};

        return {
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

            clearTable: function(names) {
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
