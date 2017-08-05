
export function routerConfig ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('ping-check', {
            url: '/ping',
            template: '<div><p>Are you still alive?</p></div>'
        })
        ;

    // MAIN EXCEPTION
    $urlRouterProvider.when('', ($injector, $location) => {
        const state = $injector.get('$state');
        state.go('common.jumbo.main');
        return $location.path();
    });
    $urlRouterProvider.when('/main', ($injector, $location) => {
        const state = $injector.get('$state');
        state.go('common.jumbo.main');
        return $location.path();
    });
    $urlRouterProvider.when('/home', ($injector, $location) => {
        const state = $injector.get('$state');
        state.go('common.jumbo.main');
        return $location.path();
    });

    // PAGE IS NOT FOUND
    $urlRouterProvider.otherwise(($injector, $location) => {
       const state = $injector.get('$state');
       state.go('common.default.error', {
           httpStatus: 404
       });
       return $location.path();
    });
}
