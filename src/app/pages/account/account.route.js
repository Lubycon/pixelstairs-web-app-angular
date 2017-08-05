
export function routerConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('full.default.signin', {
            url: '/signin',
            templateUrl: 'app/pages/account/signin.tmpl.html',
            controller: 'SigninController',
            controllerAs: 'SigninCtrl',
            authenticate: 'visitor'
        })
        .state('full.default.signup', {
            url: '/signup',
            templateUrl: 'app/pages/account/signup.tmpl.html',
            controller: 'SignupController',
            controllerAs: 'SignupCtrl',
            authenticate: 'visitor'
        })
        .state('common.default.auth-signup', {
            url: '/auth/signup',
            templateUrl: 'app/pages/account/auth-signup.tmpl.html',
            controller: 'AuthSignupController',
            controllerAs: 'AuthSignupCtrl',
            authenticate: 'member:inactive:only'
        })
        .state('common.default.signdrop', {
            url: '/signdrop',
            templateUrl: 'app/pages/account/signdrop.tmpl.html',
            controller: 'SigndropController',
            controllerAs: 'SigndropCtrl',
            authenticate: 'member:inactive',
            resolve: {
                getReasonRsv: (APIService) => {
                    return APIService.resource('members.signdropSurvey').get().then();
                }
            }
        })

        .state('common.default.find-password-email', {
            url: '/password/find/email',
            templateUrl: 'app/pages/account/find-password-email.tmpl.html',
            controller: 'FindPasswordEmailController',
            controllerAs: 'FindPassEmailCtrl',
            authenticate: 'visitor'
        })
        .state('common.default.reset-password', {
            url: '/password/reset/:code',
            templateUrl: 'app/pages/account/reset-password.tmpl.html',
            controller: 'ResetPasswordController',
            controllerAs: 'ResetPassCtrl',
            params: {
                code: null
            },
            authenticate: 'visitor'
        })

        /* UNUSED */
        .state('common.default.signout', {
            url: '/signout',
            templateUrl: 'app/pages/account/signout.tmpl.html',
            controller: 'SignOutController',
            controllerAs: 'SignOutCtrl',
            resolve: {
                getQuotesRsv: (APIService) => {
                    return APIService.resource('quotes.success').get().then();
                }
            }
        })
        /* UNUSED */
        ;
}
