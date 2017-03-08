export function routerConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common', {
            abstract: true,
            templateUrl: 'app/layouts/default/default.layout.html',
            controller: 'DefaultLayoutController',
            controllerAs: 'layout',
        })
        .state('common.default', {
            abstract: true,
            views: {
                header: {

                },
                content: {
                    template: '<div ui-view></div>'
                },
                footer: {

                }
            }
        })
        ;
}
