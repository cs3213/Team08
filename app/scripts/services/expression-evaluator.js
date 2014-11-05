'use strict';

angular.module('rebroApp')

    .factory('ExpressionEvaluator', function() {
        var multiply = {
            sign: '*',
            evaluate: function(a, b) {
                return a * b;
            }
        };
        var divide = {
            sign: '/',
            evaluate: function(a, b) {
                return a / b;
            }
        };
        var modulo = {
            sign: '%',
            evaluate: function(a, b) {
                return a % b;
            }
        };
        var add = {
            sign: '+',
            evaluate: function(a, b) {
                return a + b;
            }
        };
        var subtract = {
            sign: '-',
            evaluate: function(a, b) {
                return a - b;
            }
        };
        var lessThan = {
            sign: '<',
            evaluate: function(a, b) {
                return a < b;
            }
        };
        var lessThanOrEqual = {
            sign: '<=',
            evaluate: function(a, b) {
                return a <= b;
            }
        };
        var greaterThan = {
            sign: '>',
            evaluate: function(a, b) {
                return a > b;
            }
        };
        var greaterThanOrEqual = {
            sign: '>=',
            evaluate: function(a, b) {
                return a >= b;
            }
        };
        var equality = {
            sign: '==',
            evaluate: function(a, b) {
                return a === b;
            }
        };
        var inequality = {
            sign: '!=',
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
