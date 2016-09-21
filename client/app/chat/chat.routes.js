'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/chat', {
    template: '<chat></chat>'
  });
}
