
export function routerConfig ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.when('', '/main');
    $urlRouterProvider.when('/', '/main');
    $urlRouterProvider.when('/home', '/main');
    $urlRouterProvider.when('/home/', '/main');

    // PAGE IS NOT FOUND
    $urlRouterProvider.otherwise('/error/404');
}
