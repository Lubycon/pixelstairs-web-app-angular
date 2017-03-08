
/*@PRIVATE MEMEBER*/
const IP_API = 'https://freegeoip.net/json?callback=JSON_CALLBACK';

export class AppSettingService {
    constructor (
        $rootScope, $http, $log, Restangular, CookieService
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$log = $log;
        this.Restangular = Restangular;
        this.CookieService = CookieService;
    }

    init() {
        const STORED_DATA = this.CookieService.get('setting');

        if(STORED_DATA) {
            this.$rootScope.setting = STORED_DATA;
            setSetting(this.$rootScope, this.Restangular);
        }
        else {
            this.$http({
                method: 'jsonp',
                url: IP_API,
                responseType: 'json'
            }).then(res => {
                this.$log.debug(res.data);
                this.$rootScope.setting = res.data;
                this.CookieService.put('setting', res.data);

                setSetting(this.$rootScope, this.Restangular);
            });
        }
    }

    set(key, value) {
        let defaultHeaders = this.Restangular.defaultHeaders;

    }
}


/* @PRIVATE METHOD */
function setSetting($rootScope, Restangular) {
    switch($rootScope.setting.country_code) {
        case 'KR' : $rootScope.setting.language = 'ko'; break;
        default : $rootScope.setting.language = 'en'; break;
    }

    var defaultHeaders = angular.extend({}, Restangular.defaultHeaders, {
        'X-lubycon-country': $rootScope.setting.country_code
    });

    Restangular.setDefaultHeaders(defaultHeaders);
}
