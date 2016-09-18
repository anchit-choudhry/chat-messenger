'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('chatMessengerApp.login', [])
  .controller('LoginController', LoginController)
  .name;
