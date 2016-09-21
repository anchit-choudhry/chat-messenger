import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './chat.routes';

export class ChatController {

    /*@ngInject*/
    constructor() {
    }

    $onInit() {
    }
}

export default angular.module('chatMessengerApp.chat', [ngRoute])
.config(routing)
.component('chat', {
    template: require('./chat.html'),
    controller: ChatController
})
.name;
