export function routeConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.cert-signup', {
            url: '/certs/signup/:code',
            templateUrl: 'app/pages/cert/cert-signup.tmpl.html',
            controller: 'CertSignupController',
            controllerAs: 'CertSignupCtrl',
            params: {
                code: null,
                type: null
            },
            resolve: {

            },
            authenticate: 'member:active'
        })
        .state('common.default.cert-password', {
            url: '/certs/password/:code',
            templateUrl: 'app/pages/cert/cert-password-code.tmpl.html',
            controller: 'CertPasswordCodeController',
            controllerAs: 'CertPassCodeCtrl',
            params: {
                code: null
            },
            authenticate: 'visitor'
        })
        ;
}
