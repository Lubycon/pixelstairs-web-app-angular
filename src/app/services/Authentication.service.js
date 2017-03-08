/* ====== API CONST ====== */
const MEMBER_API           = 'members/';
const MEMBER_SIMPLE_API    = MEMBER_API + 'simple';
const MEMBER_SIGN_IN_API   = MEMBER_API + 'signin';
const MEMBER_SIGN_UP_API   = MEMBER_API + 'signup';
const MEMBER_SIGN_OUT_API  = MEMBER_API + 'signout';
const MEMBER_SIGN_DROP_API = MEMBER_API + 'signdrop';
/* ====== API CONST ====== */

export class AuthenticationService {
    constructor(
        $rootScope, $window, $location, $state, $filter, $log,
        CookieService, Restangular, HistoryService, AppSettingService,
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

        this.CookieService = CookieService;
        this.Restangular = Restangular;
        this.HistoryService = HistoryService;
        this.AppSettingService = AppSettingService;

        this.toastr = toastr;

        this.CUSTOM_HEADER_PREFIX = CUSTOM_HEADER_PREFIX;
    }


    set(token, reload) {
        if(!token) {
            this.$log.error('There is no token :: AuthenticationService');
            return false;
        }

        let isExistBackState = this.HistoryService.get().from.url !== '^';
        let tmp = {};
            tmp[this.CUSTOM_HEADER_PREFIX + 'token'] = token;

        this.$rootScope.memberState = {
            sign: true
        };

        // SET COOKIE
        this.CookieService.putEncrypt('auth', token);
        this.CookieService.putEncrypt('memberState', this.$rootScope.memberState);

        // SET TOKEN TO HTTP HEADER
        defaultHeaders = this.Restangular.defaultHeaders;
        defaultHeaders = angular.extend({}, defaultHeaders, tmp);
        this.Restangular.setDefaultHeaders(defaultHeaders);

        /*@LOG*/ this.$log.debug(this.Restangular.defaultHeaders);

        // GET MEMBER DATA

        this.Restangular.all(MEMBER_SIMPLE_API).customGET()
        .then(res => {
            /*@LOG*/ this.$log.debug(res);

            if(res.status.code === '0000') {
                this.$rootScope.member = res.result;
                /*@LOG*/ this.$log.debug(res.result);

                if(this.$rootScope.member.country) {
                    this.AppSettingService.set('country', this.$rootScope.member.country.alpha2Code);
                }
                this.CookieService.put('member', this.$rootScope.member);

                if(isExistBackState) {
                    /*@LOG*/ this.$log.debug(this.HistoryService.get());
                    const STATE_NAME = this.HistoryService.get().from.name;
                    const STATE_PARAMS = this.HistoryService.get().from.params;

                    if(STATE_PARAMS) this.$state.go(STATE_NAME, STATE_PARAMS);
                    else this.$staet.go(STATE_NAME);
                }
                // GO TO MAIN PAGE
                else $state.go('common.default.main');
            }
            else {
                this.clear('reload');
            }
        }, err => {
            this.clear('reload');
        });

        // REFRESH COOKIE
        this.CookieService.putEncrypt('memberState', this.$rootScope.memberState);

        if(reload === 'reload') this.$window.location.reload();
    }

    update(state) {
        this.Restangular.all(MEMBER_SIMPLE_API).customGET()
        .then(res => {
            if(res.state.code === '0000') {
                this.$rootScope.member = res.result;
                this.CookieService.put('member', this.$rootScope.member);
                this.AppSettingService.set('country', this.$rootScope.member.country.alpha2Code);

                if(state) this.$state.go(state.name, state.params);
                else return false;
            }
            else this.clear('reload');
        }, err => {
            this.clear('reload');
        });
    }

    clear(reload, state = '/main') {
        if(this.$rootScope.memberState.sign && this.$rootScope.member) {
            this.Restangular.all(MEMBER_SIGN_OUT_API).customPUT()
            .then(res => {
                delete this.$rootScope.member;

                //DESTROY TOKEN AND AUTH DATA
                this.CookieService.remove('auth');
                this.$rootScope.memberState = false;

                this.CookieService.putEncrypt('memberState', this.$rootScope.memberState);

                this.AppSettingService.set('country', this.$rootScope.setting.country_code);

                this.$state.go('common.default.main');

                if(reload === 'reload') $window.location.realod();
            }, err => {
                this.$log.error('AUTH CLEAR METHOD IS NOT WORKED :: AuthenticationService');
                return false;
            });
        }
    }
}
