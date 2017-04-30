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
                getContentRsv: (APIService, $stateParams) => {
                    return APIService.resource('contents.detail', { id: $stateParams.id }).get().then();
                }
            }
        })
        .state('common.default.contents-upload', {
            url: '/contents/upload',
            templateUrl: 'app/pages/contents/contents-upload.tmpl.html',
            controller: 'ContentsUploadController',
            controllerAs: 'ContentsUploadCtrl',
            authenticate: 'all'
        })
        ;
}
