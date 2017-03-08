

export function restangularConfig(
    RestangularProvider,
    API_CONFIG, USER_AGENT, APP_VERSION
) {
    'ngInject';

    let defaultHeaders = null;
    let lang = getLanguage();

    defaultHeaders = {
        'Content-Type': 'application/json',
        'X-lubycon-version': APP_VERSION,
        'X-lubycon-language': lang,
        'X-lubycon-device': 'bs=' + USER_AGENT.browser + ',dvc=' + USER_AGENT.device + ',os=' + USER_AGENT.os
    };

    if(API_CONFIG.host.indexOf('api.') > -1) {
        // 추후 개발/운영 서버가 나누어지면 dev.등으로 바꿀 것
        defaultHeaders['lubycon-dev'] = API_CONFIG.appkey;
    }

    RestangularProvider.setDefaultHeaders(defaultHeaders);
    RestangularProvider.setBaseUrl(API_CONFIG.host);
}


// PRIVATE METHOD

function getLanguage() {
    /*ALLOW BROWSER SETTING*/
    let result = 'en-US';

    const browserLanguage = navigator.language;
    const supportedLanguage = ['ko-KR', 'en-US'];

    if(browserLanguage) {
        supportedLanguage.some((v) => {
            if(v.indexOf(browserLanguage) > -1) result = v;
            return v.indexOf(browserLanguage) > -1;
        });
    }

    return result;
}
