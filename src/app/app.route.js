
export function routerConfig ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('ping-check', {
            url: '/ping',
            template: '<div><p>Are you still alive?</p></div>'
        })
        ;

    $urlRouterProvider.when('', '/main');
    $urlRouterProvider.when('/', '/main');
    $urlRouterProvider.when('/home', '/main');
    $urlRouterProvider.when('/home/', '/main');

    // PAGE IS NOT FOUND
    $urlRouterProvider.otherwise('/error/404');
}
