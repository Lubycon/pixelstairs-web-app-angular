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
            url: '/docs/terms/:lang',
            params: {
                lang: null
            },
            templateUrl: ($stateProvider) => {
                return `app/pages/company/terms-${$stateProvider.lang}.tmpl.html`;
            },
            controller: 'DocsController',
            controllerAs: 'DocsCtrl'
        })
        .state('common.default.privacy-policy', {
            url: '/docs/privacypolicy/:lang',
            parmas: {
                lang: null
            },
            templateUrl: ($stateParams) => {
                return `app/pages/company/privacyPolicy-${$stateParams.lang}.tmpl.html`;
            },
            controller: 'DocsController',
            controllerAs: 'DocsCtrl'
        })
        ;
}
