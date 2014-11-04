'use strict';

angular.module('rebroApp')

    .factory('RunnerSvc', function($interval) {
        var refreshRate = 20;

        return {
            runProgram: function(build) {
                var i = 0;
                var intervalPromise = $interval(function () {
                    if (i < build.executableList.length) {
                        build.executableList[i++].execute();
                    } else if (build.loopsForever && !build.hasEmptyForever()) {
                        i = build.foreverIndex;
                        build.executableList[i++].execute();
                    } else {
                        $interval.cancel(intervalPromise);
                    }
                }, refreshRate);

                return intervalPromise;
            },
            stopProgram: function(intervalPromise) {
                $interval.cancel(intervalPromise);
            }
        };
    });
