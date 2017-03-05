
export function routerConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'app/pages/main/main.tmpl.html',
            controller: 'MainController',
            controllerAs: 'MainCtrl'
        })
        ;
}
