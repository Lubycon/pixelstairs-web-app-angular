

export function locationConfig($locationProvider) {
    'ngInject';

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    }).hashPrefix('!');
}
