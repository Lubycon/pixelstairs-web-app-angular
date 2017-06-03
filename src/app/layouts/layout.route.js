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
                    controllerAs: 'GlobalHeaderCtrl'
                },
                content: {
                    template: '<div ui-view></div>'
                },
                footer: {
                    templateUrl: 'app/components/footer/footer.tmpl.html',
                    controller: 'FooterController',
                    controllerAs: 'GlobalFooterCtrl'
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
