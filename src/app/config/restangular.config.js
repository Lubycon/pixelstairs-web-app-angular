

export function restangularConfig(
    RestangularProvider,
    API_HOST, IS_DEV, DEV_KEY, USER_AGENT, APP_VERSION, CUSTOM_HEADER_PREFIX
) {
    'ngInject';

    let defaultHeaders = RestangularProvider.defaultHeaders;
    const $log = angular.injector(['ng']).get('$log');

    defaultHeaders['Content-Type'] = 'application/json';
    defaultHeaders[CUSTOM_HEADER_PREFIX + 'version'] = APP_VERSION;
    defaultHeaders[CUSTOM_HEADER_PREFIX + 'device'] = 'bs=' + USER_AGENT.browser + ',dvc=' + USER_AGENT.device + ',os=' + USER_AGENT.os;

    if(IS_DEV) {
        defaultHeaders['lubycon-dev'] = DEV_KEY;
    }

    RestangularProvider.setDefaultHeaders(defaultHeaders);
    RestangularProvider.setBaseUrl(API_HOST);

    /* SET ERROR INTERCEPTOR */
    RestangularProvider.setErrorInterceptor(function(res) {
        $log.debug('========================== !!!GET RESPONSE ERROR!!! ============================');
        $log.debug('status : ',res.status,' -> ',res.statusText);
        $log.debug('url : ', res.config.url);
        $log.debug('method : ',res.config.method);
        $log.debug('data : ',res.data);
        $log.debug('=================================================================================');

        return true;
    });
}
