export function routeConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.cert-signup-landing', {
            url: '/certs/signup/landing/:code',
            templateUrl: 'app/pages/cert/cert-signup-landing.tmpl.html',
            controller: 'CertSignupLandingController',
            controllerAs: 'CertSignupLandingCtrl',
            params: {
                code: null,
                type: null
            },
            resolve: {

            },
            authenticate: 'member:active'
        })
        .state('common.default.cert-password', {
            url: '/certs/password/landing/:code',
            templateUrl: 'app/pages/cert/cert-password-landing.tmpl.html',
            controller: 'CertPasswordLandingController',
            controllerAs: 'CertPassLandingCtrl',
            params: {
                code: null
            },
            authenticate: 'visitor'
        })
        ;
}
