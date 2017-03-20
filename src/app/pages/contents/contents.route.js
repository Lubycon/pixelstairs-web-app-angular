export function routeConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.contents-upload', {
            url: '/contents/upload',
            templateUrl: 'app/pages/contents/contents-upload.tmpl.html',
            controller: 'ContentsUploadController',
            controllerAs: 'ContentsUploadCtrl'
        })
        ;
}
