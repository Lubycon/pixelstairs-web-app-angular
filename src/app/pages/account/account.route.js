
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
            controllerAs: 'SignOutCtrl'
        })
        ;
}
