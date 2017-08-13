
export function routeConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.error', {
            url: '/error/:httpStatus',
            templateUrl: 'app/pages/error/error.tmpl.html',
            controller: 'ErrorPageController',
            controllerAs: 'ErrorPageCtrl',
            params: {
                httpStatus: null
            }
        })
        ;
}
