
export function routerConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('full.default.signin', {
            url: '/signin',
            templateUrl: 'app/pages/account/signin.tmpl.html',
            controller: 'SigninController',
            controllerAs: 'SigninCtrl',
            data: {
                permissions: {
                    only: 'GHOST',
                    redirectTo: 'common.jumbo.main'
                }
            }
        })
        .state('full.default.signup', {
            url: '/signup',
            templateUrl: 'app/pages/account/signup.tmpl.html',
            controller: 'SignupController',
            controllerAs: 'SignupCtrl',
            data: {
                permissions: {
                    only: 'GHOST',
                    redirectTo: 'common.jumbo.main'
                }
            }
        })
        .state('common.default.auth-signup', {
            url: '/auth/signup',
            templateUrl: 'app/pages/account/auth-signup.tmpl.html',
            controller: 'AuthSignupController',
            controllerAs: 'AuthSignupCtrl',
            data: {
                permissions: {
                    only: 'INACTIVE_USER',
                    redirectTo: 'common.jumbo.main'
                }
            }
        })
        .state('common.default.signdrop', {
            url: '/signdrop',
            templateUrl: 'app/pages/account/signdrop.tmpl.html',
            controller: 'SigndropController',
            controllerAs: 'SigndropCtrl',
            resolve: {
                getReasonRsv: (APIService) => {
                    return APIService.resource('users.signdropSurvey').get().then();
                }
            },
            data: {
                permissions: {
                    except: 'GHOST',
                    redirectTo: 'full.default.signin'
                }
            }
        })

        .state('common.default.find-password-email', {
            url: '/password/find/email',
            templateUrl: 'app/pages/account/find-password-email.tmpl.html',
            controller: 'FindPasswordEmailController',
            controllerAs: 'FindPassEmailCtrl',
            data: {
                permissions: {
                    only: 'GHOST',
                    redirectTo: 'common.jumbo.main'
                }
            }
        })
        .state('common.default.reset-password', {
            url: '/password/reset/:code',
            templateUrl: 'app/pages/account/reset-password.tmpl.html',
            controller: 'ResetPasswordController',
            controllerAs: 'ResetPassCtrl',
            params: {
                code: null
            }
        })
        ;
}
