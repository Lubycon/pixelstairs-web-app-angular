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

            this.__getUser__().then(res => {
                console.log('GET USER');
                defer.resolve();
            }, err => {
                console.error('GET USER ERROR');
                defer.reject();
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

    set({ accessToken, refreshToken, state }) {
        let defer = this.$q.defer();

        if(!accessToken) {
            this.$log.error('There is no token :: AuthenticationService');
            return false;
        }

        this.$rootScope.authStatus = {
            sign: true
        };

        this.__setAuthCookies__({
            accessToken,
            refreshToken,
            state: this.$rootScope.authStatus
        });
        this.__setTokenToHeader__(accessToken);
        /*@LOG*/ this.$log.debug(this.Restangular.defaultHeaders);

        // GET MEMBER DATA
        this.__getUser__().then(res => {
            defer.resolve();
        }, err => {
            defer.reject();
        });

        // REFRESH COOKIE
        this.__setAuthCookies__({
            accessToken,
            refreshToken,
            state: this.$rootScope.authStatus
        });

        return defer.promise;
    }

    update(state = { name: 'common.jumbo.main', param: null }) {
        this.__getUser__().then(res => {
            if(state) this.$state.go(state.name, state.params);
            else return false;
        });
    }

    reissuance() {
        // REISSUANCE AUTH TOKEN USING REFRESH TOKEN
        console.log('[Error] need refresh token!');
    }

    clear(reload, state = 'common.jumbo.main') {
        if(this.$rootScope.authStatus.sign || this.$rootScope.member) {
            return this.APIService.resource('users.signout').put()
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
        else {
            this.clearForce(reload, state);
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

    __setAuthCookies__({ accessToken, refreshToken, state }) {
        if (accessToken) {
            this.CookieService.putEncrypt('auth', accessToken);
        }
        if (refreshToken) {
            this.CookieService.putEncrypt('refresh', refreshToken);
        }
        if (state) {
            this.CookieService.putEncrypt('authStatus', state);
        }
    }

    __setTokenToHeader__(accessToken) {
        let tmp = {},
            defaultHeaders = this.Restangular.defaultHeaders;

        tmp[`Authorization`] = `Bearer ${accessToken}`;
        defaultHeaders = angular.extend({}, defaultHeaders, tmp);

        this.Restangular.setDefaultHeaders(defaultHeaders);
    }

    __removeTokenFromHeader__() {
        let defaultHeaders = this.Restangular.defaultHeaders;

        if(defaultHeaders[`Authorization`]) {
            delete defaultHeaders[`Authorization`];
            this.Restangular.setDefaultHeaders(defaultHeaders);

            return true;
        }
        else {
            return false;
        }
    }

    __clearAuth__(reload, state) {
        this.CookieService.remove('auth');
        this.CookieService.remove('refresh');
        this.$rootScope.authStatus.sign = false;

        this.CookieService.putEncrypt('authStatus', this.$rootScope.authStatus);
        this.__removeTokenFromHeader__();

        this.$state.go(state).then(res => {
            if(!reload || reload !== 'reload') return false;
            this.$timeout(() => {
                this.$window.location.reload();
            });
        });
    }

    __getUser__ () {
        let defer = this.$q.defer();
        this.APIService.resource('users.me').get()
        .then(res => {
            this.$rootScope.member = res.result;
            this.CookieService.put('member', this.$rootScope.member);

            defer.resolve();
        }, err => {
            this.$log.debug('AUTHENTICATE ERROR CATCH => ', err.status);
            if (err.status && err.status === 419) {
                this.reissuance();
            }
            else {
                defer.reject(err);
                this.clear('reload');
            }
        });

        return defer.promise;
    }
}
