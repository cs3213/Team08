'use strict';

angular.module('rebroApp')

    .factory('VarTable', function() {

        var ReservedVar = {
            POSITION_X: '_positionX',
            POSITION_Y: '_positionY',
            SCALE_X: '_scaleX',
            SCALE_Y: '_scaleY'
        };

        var defaultValues = {};
        defaultValues[ReservedVar.POSITION_X] = 0;
        defaultValues[ReservedVar.POSITION_Y] = 0;
        defaultValues[ReservedVar.SCALE_X] = 1.0;
        defaultValues[ReservedVar.SCALE_Y] = 1.0;

        var reservedVars = angular.copy(defaultValues);
        var userVars = {};

        return {
            VAR_POSITION_X: ReservedVar.POSITION_X,
            VAR_POSITION_Y: ReservedVar.POSITION_Y,
            VAR_SCALE_X: ReservedVar.SCALE_X,
            VAR_SCALE_Y: ReservedVar.SCALE_Y,

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

            getAllVarNames: function() {
                return this.getUserVarNames().concat(this.getReservedVarNames());
            },

            addVarName: function(name) {
                userVars[name] = 0;
            },

            removeVarName: function(name) {
                delete userVars[name];
            },

            initValues: function() {
                reservedVars = angular.copy(defaultValues);
                for (var name in userVars) {
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
                    reservedVars[name] = Number(value);
                } else if (userVars.hasOwnProperty(name)) {
                    userVars[name] = Number(value);
                } else {
                    // error
                }
            }
        };
    });
