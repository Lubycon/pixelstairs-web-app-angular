

export function restangularConfig(
    RestangularProvider,
    API_CONFIG, USER_AGENT, APP_VERSION, CUSTOM_HEADER_PREFIX
) {
    'ngInject';

    let defaultHeaders = RestangularProvider.defaultHeaders;

    defaultHeaders['Content-Type'] = 'application/json';
    defaultHeaders[CUSTOM_HEADER_PREFIX + 'version'] = APP_VERSION;
    defaultHeaders[CUSTOM_HEADER_PREFIX + 'device'] = 'bs=' + USER_AGENT.browser + ',dvc=' + USER_AGENT.device + ',os=' + USER_AGENT.os;

    if(API_CONFIG.host.indexOf('api.') > -1) {
        /*TODO
            * 추후 개발/운영 서버가 나누어지면 dev.등으로 바꿀 것
        */
        defaultHeaders['lubycon-dev'] = API_CONFIG.appkey;
    }

    RestangularProvider.setDefaultHeaders(defaultHeaders);
    RestangularProvider.setBaseUrl(API_CONFIG.host);
}
