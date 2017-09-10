export function routeConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.jumbo.aboutus', {
            url: '/aboutus?section',
            params: {
                section: null
            },
            views: {
                jumbo: {
                    templateUrl: 'app/components/jumbotron/about.jumbo.tmpl.html',
                    controller: 'AboutJumboController',
                    controllerAs: 'AboutJumboCtrl'
                },
                page: {
                    templateUrl: 'app/pages/company/aboutus.tmpl.html',
                    controller: 'AboutusController',
                    controllerAs: 'AboutusCtrl'
                }
            }
        })
        .state('common.default.terms', {
            url: '/docs/terms/:lang?section',
            params: {
                lang: 'en',
                section: null
            },
            templateUrl: ($stateProvider) => {
                return `app/pages/company/terms-${$stateProvider.lang}.tmpl.html`;
            },
            controller: 'DocsController',
            controllerAs: 'DocsCtrl'
        })
        .state('common.default.privacy-policy', {
            url: '/docs/privacypolicy/:lang?section',
            parmas: {
                lang: 'en',
                section: null
            },
            templateUrl: ($stateParams) => {
                return `app/pages/company/privacyPolicy-${$stateParams.lang}.tmpl.html`;
            },
            controller: 'DocsController',
            controllerAs: 'DocsCtrl'
        })
        ;
}
