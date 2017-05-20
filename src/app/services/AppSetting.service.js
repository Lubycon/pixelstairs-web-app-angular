import regeneratorRuntime from 'regenerator-runtime';

/* @PRIVATE MEMEBER */
const IP_API = 'https://freegeoip.net/json?callback=JSON_CALLBACK';
/* @PRIVATE MEMEBER */

export class AppSettingService {
    constructor (
        $rootScope, $http, $log, $q, $translate,
        Restangular, CookieService,
        CUSTOM_HEADER_PREFIX
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
        this.$translate = $translate;

        this.Restangular = Restangular;
        this.CookieService = CookieService;

        this.CUSTOM_HEADER_PREFIX = CUSTOM_HEADER_PREFIX;
    }


    init() {
        let defer = this.$q.defer();

        const STORED_DATA = this.CookieService.get('setting');

        if(STORED_DATA) {
            this.$rootScope.setting = STORED_DATA;
            this.__setSetting__();
            console.log('STORED SETTING => ',STORED_DATA);
            defer.resolve();
        }
        else {
            this.$http({
                method: 'jsonp',
                url: IP_API,
                responseType: 'json'
            }).then(res => {
                console.log('IP LOCATION=> ', res);
                this.$rootScope.setting = res.data;
                this.CookieService.put('setting', res.data);

                this.__setSetting__();
                defer.resolve();
            }, err => {
                /*@LOG*/ this.$log.debug(err);
                defer.reject('App Setting Error!');
            });
        }

        return defer.promise;
    }

    set(key, value) {
        const ALLOW_PARAMS = [
            'country',
            'language'
        ];

        let defaultHeaders = this.Restangular.defaultHeaders;
        let tmp = {};

        /*@LOG*/ this.$log.debug('AppSettingService.set => ', key, value);
        if(ALLOW_PARAMS.indexOf(key) > -1) {
            let headerKey = this.CUSTOM_HEADER_PREFIX + key;
            tmp[headerKey] = value;

            if(key === 'country') {
                tmp[this.CUSTOM_HEADER_PREFIX + 'language'] = this.__setLanguage__(value);
            }
            else if(key === 'language') $translate.use(value);

            defaultHeaders = angular.extend({}, defaultHeaders, tmp);
        }
        else {
            this.$log.error('This value is not allowed for setting :: AppSettingService');
            return false;
        }

        /*@LOG*/ this.$log.debug(defaultHeaders);

        this.Restangular.setDefaultHeaders(defaultHeaders);
    }






    /* @PRIVATE METHOD */
    __setSetting__() {
        let tmp = {},
            lang = this.__setLanguage__(this.$rootScope.setting.country_code);

        this.$rootScope.setting.language = lang;
        tmp[`${this.CUSTOM_HEADER_PREFIX}language`] = lang;
        tmp[`${this.CUSTOM_HEADER_PREFIX}country`] = this.$rootScope.setting.country_code;
        this.$translate.use(this.$rootScope.setting.language);

        let defaultHeaders = angular.extend({}, this.Restangular.defaultHeaders, tmp);

        this.Restangular.setDefaultHeaders(defaultHeaders);

        /*@LOG*/ this.$log.debug('HTTP HEADER => ', this.Restangular.defaultHeaders);
    }

    __setLanguage__(country) {
        switch(country) {
            case 'KR': return 'ko-KR';
            default: return 'en-US';
        }
    }
}
