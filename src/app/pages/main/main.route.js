
export function routerConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.jumbo.main', {
            url: '/',
            views: {
                jumbo: {
                    templateUrl: 'app/components/jumbotron/main.jumbo.tmpl.html',
                    controller: 'MainJumboController',
                    controllerAs: 'MainJumboCtrl',
                    resolve: {
                        getImageRsv(APIService) {
                            return APIService.resource('contents.list').get({
                                pageSize: '3',
                                sort: 'featured:desc'
                            }).then();
                        }
                    }
                },
                page: {
                    templateUrl: 'app/pages/main/main.tmpl.html',
                    controller: 'MainController',
                    controllerAs: 'MainCtrl'
                }
            }
        })
        ;
}
