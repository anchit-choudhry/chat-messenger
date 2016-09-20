import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

var mysql = require('mysql');

export class MainController {

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
      });
    this.isPanelOpen = false;
  }
}

export default angular.module('chatMessengerApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
