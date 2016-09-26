import angular from 'angular';
const ngRoute = require('angular-route');
const ngCookies = require('angular-cookies');
import routing from './chat.routes';

export class ChatController {

    /*@ngInject*/
    constructor($cookies, $http, $location, $q) {
        this.$cookies = $cookies;
        this.$http = $http;
        this.$location = $location;
        this.$q = $q;
    }

    $onInit() {
        var cookieStore = this.$cookies.getObject('profile');
        if(cookieStore) {
            this.checkValidSession(cookieStore).then(response => {
                if(!response) {
                    this.$location.path('/');
                }
            });
        }
        this.username = cookieStore.username;
        this.session = cookieStore.session;
        this.alertMsg = null;
        this.message = null;
        this.messages = this.getMessages(this.session, 'new');
    }

    checkValidSession(cookieStore) {
        var deferred = this.$q.defer();
        this.$http({
            method: 'GET',
            url: '/api/checksession',
            params: cookieStore
        }).success(function(response) {
            deferred.resolve(response);
        })
        .error(function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    updateAlert(alertVal) {
        this.alertMsg = alertVal;
    }

    logout() {
        return this.$http({
            method: 'POST',
            url: '/api/logout',
            data: { session: this.session }
        }).then(response => {
            var alertVal = !response || response.status !== 200
            ? { type: 'danger', text: 'Oops! We encountered a network error' }
            : response.data === false
            ? { type: 'warning', text: 'Oops! Invalid User/User already logged out' } : null;
            if(alertVal === null) {
                this.$cookies.remove('profile');
                alertVal = { type: 'success', text: 'Great! Logging you out in a while' };
            }
            this.updateAlert(alertVal);
            this.$location.path('/');
        });
    }

    getMessages(session, type) {
        return [];
        /*var params = type === 'new' ? { type: 'new', limit: -1 } : { type : 'all', limit : -1};
        return this.$http({
            method: 'POST',
            url: '/api/getMessages',
            data: params
        }).then(repsonse => {
            return [];
        });*/
    }

    sendMessage(text) {
        this.message = null;
        return true;
    }
}

export default angular.module('chatMessengerApp.chat', [ngRoute, ngCookies])
.config(routing)
.component('chat', {
    template: require('./chat.html'),
    controller: ChatController
})
.name;
