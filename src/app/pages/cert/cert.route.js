export function routeConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.cert-signup-landing', {
            url: '/certs/signup/landing/:code',
            templateUrl: 'app/pages/cert/cert-signup-landing.tmpl.html',
            controller: 'CertSignupLandingController',
            controllerAs: 'CertSignupLandingCtrl',
            params: {
                code: null
            },
            data: {
                permissions: {
                    except: 'GHOST',
                    redirectTo: 'full.default.signin'
                }
            }
        })
        .state('common.default.cert-password', {
            url: '/certs/password',
            templateUrl: 'app/pages/cert/cert-password.tmpl.html',
            controller: 'CertPasswordController',
            controllerAs: 'CertPassCtrl',
            data: {
                permissions: {
                    except: 'GHOST',
                    redirectTo: 'full.default.signin'
                }
            }
        })
        .state('common.default.cert-password-landing', {
            url: '/certs/password/landing/:code',
            templateUrl: 'app/pages/cert/cert-password-landing.tmpl.html',
            controller: 'CertPasswordLandingController',
            controllerAs: 'CertPassLandingCtrl',
            params: {
                code: null
            }
        })
        ;
}
