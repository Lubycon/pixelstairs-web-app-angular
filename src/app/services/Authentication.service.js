export class AuthenticationService {
    constructor(
        $rootScope, $window, $location, $state, $filter,
        $log, Restangular, $q, $timeout,
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
        this.$timeout = $timeout;

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

        if(this.__isSigned__()) {
            let token = this.CookieService.getDecrypt('auth'),
                authStatus = this.CookieService.getDecrypt('authStatus');

            this.__setTokenToHeader__(token);
            this.$rootScope.authStatus = authStatus;

            this.APIService.resource('members.simple').get()
            .then(res => {
                /*@LOG*/ this.$log.debug('MEMBER INFO IS LOADED');

                this.$rootScope.member = res.result;
                this.CookieService.put('member', this.$rootScope.member);

                defer.resolve();
            }, err => {
                /*@LOG*/ this.$log.debug('AUTHENTICATE ERROR CATCH => ', err);
                this.clear('reload');
                defer.reject('Authentication init Error!');
            });
        }
        else {
            this.$rootScope.authStatus = {
                sign: false
            };
            defer.resolve();
        }

        return defer.promise;
    }

    set(params = {}) {
        let defer = this.$q.defer();

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

            defer.resolve();
        }, err => {
            /*LOG*/ this.$log.debug(err);
            defer.reject();
            this.clear('reload');
        });

        // REFRESH COOKIE
        this.__setAuthCookies__(params.token, this.$rootScope.authStatus);

        return defer.promise;
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

    clear(reload, state = 'common.jumbo.main') {
        if(this.$rootScope.authStatus.sign || this.$rootScope.member) {
            this.APIService.resource('members.signout').put()
            .then(res => {
                delete this.$rootScope.member;

                //DESTROY TOKEN AND AUTH DATA
                this.__clearAuth__(reload, state);
            }, err => {
                /*LOG*/ this.$log.debug(err);
                this.$log.error('AUTH CLEAR METHOD IS NOT WORKED. TOKEM WILL BE FORCE REMOVED :: AuthenticationService');

                //DESTROY TOKEN AND AUTH DATA
                this.__clearAuth__(reload, state);
            });
        }
    }

    clearForce(reload, state = 'common.jumbo.main') {
        this.__clearAuth__(reload, state);
    }



    __isSigned__() {
        const AUTH_COOKIE = this.CookieService.getDecrypt('auth');
        const AUTH_STATUS_COOKIE = this.CookieService.getDecrypt('authStatus');

        return !!AUTH_COOKIE && !!AUTH_STATUS_COOKIE.sign;
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

    __clearAuth__(reload, state) {
        let country_code;
        if(this.$rootScope.setting && this.$rootScope.setting.country_code) {
            country_code = this.$rootScope.setting.country_code;
        }
        else country_code = 'unknown';

        this.CookieService.remove('auth');
        this.$rootScope.authStatus.sign = false;

        this.CookieService.putEncrypt('authStatus', this.$rootScope.authStatus);

        this.AppSettingService.set('country', country_code);

        this.$state.go(state).then(res => {
            if(reload === 'reload') {
                this.$window.location.reload();
            }
        });
    }
}
