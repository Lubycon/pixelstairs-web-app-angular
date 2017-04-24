

export function logConfig($logProvider, API_CONFIG) {
    'ngInject';
    /*
        @TODO
        * apidev.pixelstairs.com -> development api
        * api.pixelstairs.com -> pro api
    */

    $logProvider.debugEnabled(API_CONFIG.isDev);
}
