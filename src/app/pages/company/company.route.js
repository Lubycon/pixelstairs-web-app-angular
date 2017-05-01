export function routeConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.aboutus', {
            url: '/aboutus',
            templateUrl: 'app/pages/company/aboutus.tmpl.html',
            controller: 'AboutusController',
            controllerAs: 'AboutusCtrl'
        })
        ;
}
