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
            data: {
                permissions: {
                    except: ['GHOST', 'INACTIVE_USER', 'STOP'],
                    redirectTo: {
                        GHOST: 'full.default.signin',
                        INACTIVE_USER: 'common.default.auth-signup',
                        STOP: 'common.jumbo.main'
                    }
                }
            }
        })
        .state('common.default.contents-success', {
            url: '/contents/success/:id',
            templateUrl: 'app/pages/contents/contents-upload-success.tmpl.html',
            controller: 'ContentsUploadSuccessController',
            controllerAs: 'ContentsSuccessCtrl',
            params: {
                id: null
            },
            data: {
                permissions: {
                    except: ['GHOST', 'INACTIVE_USER', 'STOP'],
                    redirectTo: {
                        GHOST: 'full.default.signin',
                        INACTIVE_USER: 'common.default.auth-signup',
                        STOP: 'common.jumbo.main'
                    }
                }
            }
        })
        ;
}
