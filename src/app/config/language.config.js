

export function languageConfig(RestangularProvider, CUSTOM_HEADER_PREFIX) {
    'ngInject';

    let lang = 'en-US';
    let defaultHeaders = RestangularProvider.defaultHeaders;

    const browserLanguage = navigator.language;
    const supportedLanguage = ['ko-KR', 'en-US'];

    if(browserLanguage) {
        supportedLanguage.some((v) => {
            if(v.indexOf(browserLanguage) > -1) lang = v;
            return v.indexOf(browserLanguage) > -1;
        });
    }

    defaultHeaders[CUSTOM_HEADER_PREFIX + 'language'] = lang;

    RestangularProvider.setDefaultHeaders(defaultHeaders);
}
