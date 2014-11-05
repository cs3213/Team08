'use strict';

angular.module('rebroApp')

    .value('Program', function() {
        this.stmtList = [];
    })

    .value('Statement', function(type, isContainer) {
        this.type = type;
        this.isContainer = isContainer;
        this.args = [];
        this.stmtList = [];
        this.expressionList = [];

        this.hasArgs = function() {
            return this.args.length > 0;
        };

        for (var i = 2; i < arguments.length; i++) {
            this.args.push(arguments[i]);
        }
        if(this.type === 'assign' && this.expressionList.length === 0){
            this.expressionList.push(undefined);
        }
        if(this.type === 'if' && this.expressionList.length === 0){
            this.expressionList.push(undefined);
        }
        this.removeOperation = function(){
            if(this.type === 'assign'){
                if(this.expressionList.length > 2){
                    this.expressionList.pop();
                    this.expressionList.pop();
                }
            }else if(this.type === 'if'){
                if(this.expressionList.length > 2){
                    this.expressionList.pop();
                    this.expressionList.pop();
                }
            }
        };

        this.addOperation = function(){
            if(this.type === 'assign'){
                this.expressionList.push(undefined);
                this.expressionList.push(undefined);
            }else if(this.type === 'if'){
                this.expressionList.push(undefined);
                this.expressionList.push(undefined);
            }
        };
    })

    .value('Character', function() {
        this.xPos = 0;
        this.yPos = 0;
        this.costume = "costume-default";
        this.isVisible = true;
    });
