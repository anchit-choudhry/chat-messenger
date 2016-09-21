import angular from 'angular';
const ngRoute = require('angular-route');
const ngCookies = require('angular-cookies');
import routing from './main.routes';

export class MainController {

    /*@ngInject*/
    constructor($cookies, $http, $location, $q, $timeout) {
        this.$cookies = $cookies;
        this.$http = $http;
        this.$location = $location;
        this.$q = $q;
        this.$timeout = $timeout;
    }

    $onInit() {
        var cookieStore = this.$cookies.getObject('profile');
        if(cookieStore) {
            this.checkValidSession(cookieStore).then(response => {
                if(response) {
                    this.$location.path('/chat');
                }
            });
        };
        this.$http.get('/api/things').then(response => {
            this.awesomeThings = response.data;
        });
        this.isPanelOpen = false;
        this.username = null;
        this.email = null;
        this.password = null;
        this.confirmpwd = null;
        this.alertMsg = null;
    }

    checkValidSession(cookieStore) {
        var deferred = this.$q.defer();
        this.$http({
            method : 'GET',
            url: '/api/checksession',
            params: cookieStore
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    updateAlert(alertVal) {
        this.alertMsg = alertVal;
    }

    checkUser() {
        if(angular.isUndefined(this.username) || this.username === null ||
        this.username.trim().length < 1) {
            this.alertMsg = { type : 'warning', text : 'Oops! Please type in a username!' };
            return true;
        }
        return this.$http.get('/api/checkUser?username=' + this.username).then(response => {
            var alertVal = {};
            if(response.status !== 200) {
                alertVal = { type : 'danger' , text: 'Oops! We encountered a network error!' };
                this.updateAlert(alertVal);
                return true;
            }
            alertVal = !response.data ?
            { type : 'success', text : 'Yay! The username is good for you to use!' } :
            { type : 'warning', text : 'Sorry! This username is already in use!' };
            this.updateAlert(alertVal);
            return response.data;
        });
    }

    addUser() {
        if(this.password !== this.confirmpwd) {
            this.updateAlert({
                type : 'info',
                text : 'Oops! Please make sure the password are same in both the fields!'
            });
            return false;
        }
        return this.checkUser().then(response => {
            if(response) {
                return false;
            } else {
                var params = {
                    username : this.username,
                    password: this.password,
                    email : this.email
                };
                return this.callAddUserREST(params).then(response => {
                    var alertVal = null;
                    if(!response) {
                        alertVal = {
                            type : 'danger',
                            text : 'Oops! Something went wrong while registering your username!'
                        };
                        this.updateAlert(alertVal);
                        return false;
                    }
                    else {
                        var obj = {
                            username: this.username,
                            session : response
                        };
                        this.$cookies.putObject('profile', obj);
                        alertVal = {
                            type : 'success',
                            text : 'Cool! You are registered and ready to chat!'
                        };
                        this.updateAlert(alertVal);
                        this.$location.path('/chat');
                        return true;
                    }
                });
            }
        });
    }

    callAddUserREST(params) {
        var deferred = this.$q.defer();
        this.$http({
            method : 'POST',
            url: '/api/adduser',
            data: params
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}

export default angular.module('chatMessengerApp.main', [ngRoute, ngCookies])
.config(routing)
.component('main', {
    template: require('./main.html'),
    controller: MainController
})
.name;
