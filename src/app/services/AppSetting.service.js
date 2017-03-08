
/*@PRIVATE MEMEBER*/
const IP_API = 'https://freegeoip.net/json?callback=JSON_CALLBACK';

export class AppSettingService {
    constructor (
        $rootScope, $http, $log, Restangular, CookieService,
        CUSTOM_HEADER_PREFIX
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$log = $log;
        this.Restangular = Restangular;
        this.CookieService = CookieService;
        this.CUSTOM_HEADER_PREFIX = CUSTOM_HEADER_PREFIX;
    }

    init() {
        const STORED_DATA = this.CookieService.get('setting');

        if(STORED_DATA) {
            this.$rootScope.setting = STORED_DATA;
            _setSetting(this.$rootScope, this.Restangular, this.CUSTOM_HEADER_PREFIX);
        }
        else {
            this.$http({
                method: 'jsonp',
                url: IP_API,
                responseType: 'json'
            }).then(res => {
                this.$rootScope.setting = res.data;
                this.CookieService.put('setting', res.data);

                _setSetting(this.$rootScope, this.Restangular, this.CUSTOM_HEADER_PREFIX);
            });
        }

        /*@LOG*/ this.$log.debug('HTTP HEADER => ', this.Restangular.defaultHeaders);
    }

    set(key, value) {
        const ALLOW_PARAMS = [
            'country',
            'language'
        ];

        let defaultHeaders = this.Restangular.defaultHeaders;
        let tmp = {};

        /*@LOG*/ this.$log.debug(key, value);
        if(ALLOW_PARAMS.indexOf(key) > -1) {
            let headerKey = this.CUSTOM_HEADER_PREFIX + key;
            tmp[headerKey] = value;

            if(key === 'country') {
                tmp[this.CUSTOM_HEADER_PREFIX + 'language'] = setLanguage(value);
            }

            defaultHeaders = angular.extend({}, defaultHeaders, tmp);
        }
        else {
            this.$log.error('This value is not allowed for setting :: AppSettingService');
            return false;
        }

        /*@LOG*/ this.$log.debug(defaultHeaders);

        this.Restangular.setDefaultHeaders(defaultHeaders);
    }
}


/* @PRIVATE METHOD */
function _setSetting($rootScope, Restangular, CUSTOM_HEADER_PREFIX) {
    let tmp = {};

    switch($rootScope.setting.country_code) {
        case 'KR' : $rootScope.setting.language = 'ko'; break;
        default : $rootScope.setting.language = 'en'; break;
    }

    tmp[CUSTOM_HEADER_PREFIX + 'country'] = $rootScope.setting.country_code;

    let defaultHeaders = angular.extend({}, Restangular.defaultHeaders, tmp);

    Restangular.setDefaultHeaders(defaultHeaders);
}

function setLanguage(country) {
    switch(country) {
        case 'KR': return 'ko-KR';
        default: return 'en-US';
    }
}
