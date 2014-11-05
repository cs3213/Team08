'use strict';

angular.module('rebroApp')

    .factory('VarTable', function() {

        var defaultValues = {
            'spriteX': 0,
            'spriteY': 0
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

            loadVars: function(names) {
                reservedVars = angular.copy(defaultValues);
                userVars = {};
                for (var i = 0; i < names.length; i++) {
                    userVars[names[i]] = 0;
                }
            },

            getVar: function(name) {
                if (reservedVars.hasOwnProperty(name)) {
                    return reservedVars[name];
                } else if (userVars.hasOwnProperty(name)) {
                    return userVars[name];
                } else {
                    // error
                }
            },

            setVar: function(name, value) {
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
