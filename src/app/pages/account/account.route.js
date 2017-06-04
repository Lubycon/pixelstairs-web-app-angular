
export function routerConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('full.default.signin', {
            url: '/signin',
            templateUrl: 'app/pages/account/signin.tmpl.html',
            controller: 'SignInController',
            controllerAs: 'SignInCtrl',
            authenticate: 'visitor'
        })
        .state('full.default.signup', {
            url: '/signup',
            templateUrl: 'app/pages/account/signup.tmpl.html',
            controller: 'SignUpController',
            controllerAs: 'SignUpCtrl',
            authenticate: 'visitor'
        })
        .state('common.default.signout', {
            url: '/signout',
            templateUrl: 'app/pages/account/signout.tmpl.html',
            controller: 'SignOutController',
            controllerAs: 'SignOutCtrl',
            resolve: {
                getQuotesRsv: (APIService) => {
                    return APIService.resource('quotes.success').get();
                }
            }
        })
        .state('common.default.find-password-email', {
            url: '/password/find/email',
            templateUrl: 'app/pages/account/find-password-email.tmpl.html',
            controller: 'FindPasswordEmailController',
            controllerAs: 'FindPassEmailCtrl'
        })
        .state('common.default.set-new-password', {
            url: '/password/reset?:code',
            templateUrl: 'app/pages/account/set-new-password.tmpl.html',
            controller: 'SetNewPasswordController',
            controllerAs: 'SetNewPassCtrl',
            params: {
                code: null
            }
        })
        ;
}
