export function routeConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.aboutus', {
            url: '/aboutus',
            templateUrl: 'app/pages/company/aboutus.tmpl.html',
            controller: 'AboutusController',
            controllerAs: 'AboutusCtrl'
        })
        .state('common.default.terms', {
            url: '/docs/terms',
            templateUrl: 'app/pages/company/terms.tmpl.html',
            controller: 'DocsController',
            controllerAs: 'DocsCtrl'
        })
        .state('common.default.privacy-policy', {
            url: '/docs/privacypolicy',
            templateUrl: 'app/pages/company/privacyPolicy.tmpl.html',
            controller: 'DocsController',
            controllerAs: 'DocsCtrl'
        })
        ;
}
