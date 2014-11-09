'use strict';

angular.module('rebroApp')

    .factory('Expression', function(VarTable) {

        var mathOpr = {
            addition: '+',
            subtraction: '-',
            multiplication: '*',
            division: '/',
            modulo: '%'
        };

        var boolOpr = {
            lessThan: '<',
            lessThanOrEqual: '<=',
            greaterThan: '>',
            greaterThanOrEqual: '>=',
            equality: '==',
            inequality: '!=',
            and: '&&',
            or: '||'
        };

        var add = {
            evaluate: function(a, b) {
                return a + b;
            }
        };

        var subtract = {
            evaluate: function(a, b) {
                return a - b;
            }
        };

        var multiply = {
            evaluate: function(a, b) {
                return a * b;
            }
        };

        var divide = {
            evaluate: function(a, b) {
                return a / b;
            }
        };

        var modulo = {
            evaluate: function(a, b) {
                return a % b;
            }
        };

        var lessThan = {
            evaluate: function(a, b) {
                return a < b ? 1 : 0;
            }
        };

        var lessThanOrEqual = {
            evaluate: function(a, b) {
                return a <= b ? 1 : 0;
            }
        };

        var greaterThan = {
            evaluate: function(a, b) {
                return a > b ? 1 : 0;
            }
        };

        var greaterThanOrEqual = {
            evaluate: function(a, b) {
                return a >= b ? 1 : 0;
            }
        };

        var equality = {
            evaluate: function(a, b) {
                return a === b ? 1 : 0;
            }
        };

        var inequality = {
            evaluate: function(a, b) {
                return a !== b ? 1 : 0;
            }
        };

        var and = {
            evaluate: function(a, b) {
                return (a !== 0) && (b !== 0) ? 1 : 0;
            }
        };

        var or = {
            evaluate: function(a, b) {
                return (a !== 0) || (b !== 0) ? 1 : 0;
            }
        };

        var evaluators = [{}, {}, {}, {}, {}, {}];
        evaluators[0][mathOpr.multiplication] = multiply;
        evaluators[0][mathOpr.division] = divide;
        evaluators[0][mathOpr.modulo] = modulo;
        evaluators[1][mathOpr.addition] = add;
        evaluators[1][mathOpr.subtraction] = subtract;
        evaluators[2][boolOpr.lessThan] = lessThan;
        evaluators[2][boolOpr.lessThanOrEqual] = lessThanOrEqual;
        evaluators[2][boolOpr.greaterThan] = greaterThan;
        evaluators[2][boolOpr.greaterThanOrEqual] = greaterThanOrEqual;
        evaluators[3][boolOpr.equality] = equality;
        evaluators[3][boolOpr.inequality] = inequality;
        evaluators[4][boolOpr.and] = and;
        evaluators[5][boolOpr.or] = or;

        function resolveOperand(operand) {
            if (isNaN(operand)) {
                return VarTable.getValue(operand);
            } else {
                return Number(operand);
            }
        }

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
            evaluate: function(expr) {
                var result = expr.slice();  // copy to workspace
                for (var prec = 0; prec < evaluators.length; prec++) {
                    var i = 1;
                    while (i + 1 < result.length) {
                        var oprSign = result[i];
                        var lhs = resolveOperand(result[i-1]);
                        var rhs = resolveOperand(result[i+1]);
                        if (evaluators[prec].hasOwnProperty(oprSign)) {
                            var tmp = evaluators[prec][oprSign].evaluate(lhs, rhs);
                            result.splice(i-1, 3, tmp);
                        } else {
                            i += 2;
                        }
                    }
                }
                return resolveOperand(result[0]);
            }
        };
    });
