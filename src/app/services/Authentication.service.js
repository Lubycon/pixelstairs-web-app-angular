export class AuthenticationService {
    constructor(
        $rootScope, $window, $location, $state, $filter,
        $log, Restangular, $q,
        CookieService, APIService, HistoryService, AppSettingService,
        toastr,
        CUSTOM_HEADER_PREFIX
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$window = $window;
        this.$location = $location;
        this.$state = $state;
        this.$filter = $filter;
        this.$log = $log;
        this.Restangular = Restangular;
        this.$q = $q;

        this.CookieService = CookieService;
        this.APIService = APIService;
        this.HistoryService = HistoryService;
        this.AppSettingService = AppSettingService;

        this.toastr = toastr;

        this.CUSTOM_HEADER_PREFIX = CUSTOM_HEADER_PREFIX;
    }

    init() {
        /*LOG*/ this.$log.debug('Authentication init start...');
        let defer = this.$q.defer();

        let defaultHeaders = this.Restangular.defaultHeaders,
            authData = this.CookieService.getDecrypt('auth'),
            authStatus = this.CookieService.getDecrypt('authStatus');

        const isSigned = authData && authStatus.sign;

        if(isSigned) {
            defaultHeaders[this.CUSTOM_HEADER_PREFIX + 'token'] = authData;
            this.Restangular.setDefaultHeaders(defaultHeaders);
            this.$rootScope.authStatus = authStatus;

            this.APIService.resource('members.simple').get()
            .then(res => {
                /*@LOG*/ this.$log.debug('MEMBER INFO IS LOADED');

                this.$rootScope.member = res.result;
                this.CookieService.put('member', this.$rootScope.member);
                if(this.$rootScope.member.country) this.AppSettingService.set('country', this.$rootScope.member.country.alpha2Code);

                defer.resolve();
            }, err => {
                /*@LOG*/ this.$log.debug('AUTHENTICATE ERROR CATCH => ', err);
                this.clear('reload');
                defer.reject('Authentication init Error!');
            });
        }
        else defer.resolve();

        return defer.promise;
    }

    set(params = {}) {
        if(!params.token) {
            this.$log.error('There is no token :: AuthenticationService');
            return false;
        }

        this.$rootScope.authStatus = {
            sign: true
        };

        this.__setAuthCookies__(params.token, this.$rootScope.authStatus);
        this.__setTokenToHeader__(params.token);
        /*@LOG*/ this.$log.debug(this.Restangular.defaultHeaders);

        // GET MEMBER DATA
        this.APIService.resource('members.simple').get().then(res => {
            this.$rootScope.member = res.result;
            this.$rootScope.authStatus.status = res.result.status;

            if(this.$rootScope.member.country) {
                this.AppSettingService.set('country', this.$rootScope.member.country.alpha2Code);
            }

            this.CookieService.put('member', this.$rootScope.member);
            // GO TO MAIN PAGE
            if(params.state) this.$state.go(params.state);
            else this.$state.go('common.default.main');
        }, err => {
            /*LOG*/ this.$log.debug(err);
            this.clear('reload');
        });

        // REFRESH COOKIE
        this.CookieService.putEncrypt('authStatus', this.$rootScope.authStatus);

        if(params.reload === 'reload') this.$window.location.reload();
    }

    update(state) {
        this.APIService.resource('member.simple').get().then(res => {
            this.$rootScope.member = res.result;
            this.CookieService.put('member', this.$rootScope.member);
            this.AppSettingService.set('country', this.$rootScope.member.country.alpha2Code);

            if(state) this.$state.go(state.name, state.params);
            else return false;
        }, err => {
            /*LOG*/ this.$log.debug(err);
            this.clear('reload');
        });
    }

    clear(reload, state = '/main') {
        if(this.$rootScope.authStatus.sign || this.$rootScope.member) {
            this.APIService.resource('members.signout').put()
            .then(res => {
                delete this.$rootScope.member;

                //DESTROY TOKEN AND AUTH DATA
                this.__clearAuth__();

                if(reload === 'reload') this.$window.location.reload();
            }, err => {
                /*LOG*/ this.$log.debug(err);
                this.$log.error('AUTH CLEAR METHOD IS NOT WORKED. TOKEM WILL BE FORCE REMOVED :: AuthenticationService');

                //DESTROY TOKEN AND AUTH DATA
                this.__clearAuth__();

                if(reload === 'reload') this.$window.location.reload();

                return false;
            });
        }
    }

    __setAuthCookies__(token, authStatus) {
        this.CookieService.putEncrypt('auth', token);
        this.CookieService.putEncrypt('authStatus', authStatus);
    }

    __setTokenToHeader__(token) {
        let tmp = {},
            defaultHeaders = this.Restangular.defaultHeaders;

        tmp[this.CUSTOM_HEADER_PREFIX + 'token'] = token;
        defaultHeaders = angular.extend({}, defaultHeaders, tmp);

        this.Restangular.setDefaultHeaders(defaultHeaders);
    }

    __clearAuth__() {
        this.CookieService.remove('auth');
        this.$rootScope.authStatus.sign = false;

        this.CookieService.putEncrypt('authStatus', this.$rootScope.authStatus);

        this.AppSettingService.set('country', this.$rootScope.setting.country_code);

        this.$state.go('common.default.main');
    }
}
