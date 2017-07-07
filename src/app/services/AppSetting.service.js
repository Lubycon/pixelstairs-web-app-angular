/* @PRIVATE MEMEBER */
const IP_API = 'https://freegeoip.net/json?callback=JSON_CALLBACK';
/* @PRIVATE MEMEBER */

export class AppSettingService {
    constructor (
        $rootScope, $http, $log, $q, $translate, $window,
        Restangular, CookieService, toastr,
        CUSTOM_HEADER_PREFIX, IP_API
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
        this.$translate = $translate;
        this.$window = $window;

        this.Restangular = Restangular;
        this.CookieService = CookieService;

        this.toastr = toastr;

        this.CUSTOM_HEADER_PREFIX = CUSTOM_HEADER_PREFIX;
        this.IP_API = IP_API;
    }

    init() {
        /*LOG*/ this.$log.debug('App Setting init start...');
        let defer = this.$q.defer();
        this.__setSetting__().then(() => defer.resolve() );

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

    updateMemberData(memberData) {
        if(!memberData) {
            console.error('No member data');
            return false;
        }

        this.$rootScope.member = memberData;
    }




    /* @PRIVATE METHOD */
    __setSetting__() {
        let defer = this.$q.defer();

        const STORED_SETTING = this.CookieService.get('setting');
        const DEFAULT_SETTING = { country_code: 'US', language: 'en-US' };

        /* DEFAULT SETTING START */
        if(STORED_SETTING) this.$rootScope.setting = STORED_SETTING;
        else this.$rootScope.setting = DEFAULT_SETTING;
        this.__setHTTPHeader__(this.$rootScope.setting);
        this.__setTranslateLanguage__(this.$rootScope.setting);
        this.__setStoredData__(this.$rootScope.setting);
        /* DEFAULT SETTING END */

        /* OPTIONAL SETTING START */

        this.__getLocationInfo__().then(res => {
            const countryVal = {
                oldVal: this.$rootScope.setting.country_code,
                newVal: res.country_code
            };

            /* GETTING NEW LOCATION */
            if(countryVal.oldVal !== countryVal.newVal) {
                this.toastr.warning(`Your current location is "${res.country_name} / ${res.native_country_name}".<br> click this message if you want to change your language!`, '', {
                    timeOut: false,
                    closeButton: true,
                    extendedTimeOut: 100000,
                    toastClass: 'toast toast-location-change',
                    tapToDismiss: false,
                    onTap: () => {
                        res.language = this.__setLanguage__(res.country_code);
                        this.__setStoredData__(res, 'reload');
                    }
                });

                return null;
            }
            /* GETTING NEW LOCATION END */

            return res;
        }, err => {
            return null;
        }).then(res => {
            if(res) {
                res.language = this.__setLanguage__(res.country_code);
                this.$rootScope.setting = res;
            }

            /*LOG*/ this.$log.debug('SETTING DATA => ', this.$rootScope.setting);

            this.__setHTTPHeader__(this.$rootScope.setting);
            this.__setTranslateLanguage__(this.$rootScope.setting);
            this.__setStoredData__(this.$rootScope.setting);
        }).then(() => {
            defer.resolve();
        });
        /* OPTIONAL SETTING END */

        return defer.promise;
    }

    __getLocationInfo__() {
        let defer = this.$q.defer();

        const starter = () => {
            let dummyDefer = this.$q.defer();
            dummyDefer.resolve();
            return dummyDefer.promise;
        };

        let info = null;

        starter()
        .then(() => {
            return this.__getLocationByIp__();
        }).then(res => {
            info = res;
            return this.__getLocationDetail__(info.country_code);
        }, err => {
            console.error('ERROR:: ip location api is not working');
            defer.reject();
        }).then(res => {
            info.native_country_name = res.nativeName;
            defer.resolve(info);
        }, err => {
            console.error('ERROR:: ip detail location api is not working');
            info.native_country_name = null;
            defer.resolve(info);
        });

        return defer.promise;
    }

    __getLocationByIp__() {
        let defer = this.$q.defer();

        $.ajax({
            url: this.IP_API,
            dataType: 'json',
            type: 'GET'
        }).then(res => {
            defer.resolve(res);
        }, err => {
            defer.reject();
        });

        return defer.promise;
    }

    __getLocationDetail__(countryCode) {
        let defer = this.$q.defer();
        countryCode = countryCode.toLowerCase();

        $.ajax({
            url: `https://restcountries.eu/rest/v2/alpha/${countryCode}?fields=nativeName`,
            dataType: 'json',
            type: 'GET'
        }).then(res => {
            defer.resolve(res);
        }, err => {
            defer.reject();
        });

        return defer.promise;
    }

    __setStoredData__(setting, reload) {
        this.CookieService.put('setting', setting);
        if(reload === 'reload') this.$window.location.reload();
    }

    __setLanguage__(country) {
        switch(country) {
            case 'KR': return 'ko-KR';
            default: return 'en-US';
        }
    }

    __setHTTPHeader__(setting) {
        let tmp = {},
            lang = setting.language;

        tmp[`${this.CUSTOM_HEADER_PREFIX}language`] = lang;
        tmp[`${this.CUSTOM_HEADER_PREFIX}country`] = setting.country_code;

        let headers = angular.extend({}, this.Restangular.defaultHeaders, tmp);

        this.Restangular.setDefaultHeaders(headers);

        /*@LOG*/ this.$log.debug('HTTP HEADER => ', this.Restangular.defaultHeaders);
    }

    __setTranslateLanguage__(setting) {
        this.$translate.use(setting.language.split('-')[0]);
    }
}
