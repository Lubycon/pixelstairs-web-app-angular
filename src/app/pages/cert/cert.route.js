export function routeConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.cert-mail', {
            url: '/cert/mail/:type?code',
            templateUrl: 'app/pages/cert/cert-mail.tmpl.html',
            controller: 'CertMailController',
            controllerAs: 'CertMailCtrl',
            params: {
                code: null,
                type: null
            },
            resolve: {

            },
            authenticate: 'member:active'
        })
    ;
}
