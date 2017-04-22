

export function logConfig($logProvider, API_CONFIG) {
    'ngInject';

    let isDevAPI = API_CONFIG.host.indexOf('apidev.') > -1;
    /*
        @TODO
        * apidev.pixelstairs.com -> development api
        * api.pixelstairs.com -> pro api
    */

    $logProvider.debugEnabled(isDevAPI);
}
