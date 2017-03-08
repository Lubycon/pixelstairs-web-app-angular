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

        // @Log
        this.$log.debug(STORED_DATA);

        if(STORED_DATA) {
            this.$rootScope.setting = STORED_DATA;
        }
    }
}
