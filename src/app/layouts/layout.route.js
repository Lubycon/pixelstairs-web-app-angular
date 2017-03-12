export function routerConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common', {
            abstract: true,
            templateUrl: 'app/layouts/common.layout.html',
            controller: 'DefaultLayoutController',
            controllerAs: 'layout'
        })
        .state('common.default', {
            abstract: true,
            views: {
                header: {
                    templateUrl: 'app/components/header/header.tmpl.html',
                    controller: 'HeaderController',
                    controllerAs: 'GlobalHeader'
                },
                content: {
                    template: '<div ui-view></div>'
                },
                footer: {

                }
            }
        })
        .state('full', {
            abstract: true,
            templateUrl: 'app/layouts/common.layout.html',
            controller: 'FullLayoutController',
            controllerAs: 'layout'
        })
        .state('full.default', {
            abstract: true,
            views: {
                content: {
                    template: '<div ui-view></div>'
                }
            }
        })
        ;
}
