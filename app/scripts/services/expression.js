'use strict';

angular.module('rebroApp')

    .factory('Expression', function() {

        var mathOpr = {
            addition: '+',
            subtraction: '-',
            multiplication: '*',
            division: '/',
            modulo: '%'
        };

        var boolOpr = {
            lessThan: '<',
            lessThanEqual: '<=',
            greaterThan: '>',
            greaterThanEqual: '>=',
            equality: '==',
            inequality: '!='
        };

        var add = {
            sign: mathOpr.addition,
            evaluate: function(a, b) {
                return a + b;
            }
        };

        var subtract = {
            sign: mathOpr.subtraction,
            evaluate: function(a, b) {
                return a - b;
            }
        };

        var multiply = {
            sign: mathOpr.multiplication,
            evaluate: function(a, b) {
                return a * b;
            }
        };

        var divide = {
            sign: mathOpr.division,
            evaluate: function(a, b) {
                return a / b;
            }
        };

        var modulo = {
            sign: mathOpr.modulo,
            evaluate: function(a, b) {
                return a % b;
            }
        };

        var lessThan = {
            sign: boolOpr.lessThan,
            evaluate: function(a, b) {
                return a < b;
            }
        };

        var lessThanOrEqual = {
            sign: boolOpr.lessThanEqual,
            evaluate: function(a, b) {
                return a <= b;
            }
        };

        var greaterThan = {
            sign: boolOpr.greaterThan,
            evaluate: function(a, b) {
                return a > b;
            }
        };

        var greaterThanOrEqual = {
            sign: boolOpr.greaterThanEqual,
            evaluate: function(a, b) {
                return a >= b;
            }
        };

        var equality = {
            sign: boolOpr.equality,
            evaluate: function(a, b) {
                return a === b;
            }
        };

        var inequality = {
            sign: boolOpr.inequality,
            evaluate: function(a, b) {
                return a !== b;
            }
        };

        var oprPrec = [
            [multiply, divide, modulo],
            [add, subtract],
            [lessThan, lessThanOrEqual, greaterThan, greaterThanOrEqual],
            [equality, inequality]
        ];

        return {
            getMathOperators: function() {
                var result = [];
                for (var name in mathOpr) {
                    result.push(mathOpr[name]);
                }
                return result;
            },

            getBooleanOperators: function() {
                var result = [];
                for (var name in boolOpr) {
                    result.push(boolOpr[name]);
                }
                return result;
            },

            getAllOperators: function() {
                return this.getMathOperators().concat(this.getBooleanOperators());
            },

            // Pre-condition: Expression must be resolved to numeric values
            evaluateExpr: function(expr) {
                var result = expr.slice();  // copy to workspace
                for (var prec = 0; prec < oprPrec.length; prec++) {
                    for (var i = 0; i < result.length; i++) {
                        // to be implemented
                    }
                }
            }
        };
    });
