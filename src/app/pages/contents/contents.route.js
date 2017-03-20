export function routeConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.contents-detail', {
            url: '/contents/detail/:id',
            templateUrl: 'app/pages/contents/contents-detail.tmpl.html',
            controller: 'ContentsDetailController',
            controllerAs: 'ContentsDetailCtrl',
            params: {
                id: null
            },
            resolve: {
                getContentRsv: (DummyService) => {
                    return DummyService.get().content;
                }
            }
        })
        .state('common.default.contents-upload', {
            url: '/contents/upload',
            templateUrl: 'app/pages/contents/contents-upload.tmpl.html',
            controller: 'ContentsUploadController',
            controllerAs: 'ContentsUploadCtrl'
        })
        ;
}
