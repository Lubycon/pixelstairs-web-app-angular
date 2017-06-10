

export function logConfig($logProvider, IS_DEV) {
    'ngInject';
    /*
        @TODO
        * apidev.pixelstairs.com -> development api
        * api.pixelstairs.com -> pro api
    */
    $logProvider.debugEnabled(IS_DEV);
}
