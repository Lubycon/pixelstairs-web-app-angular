export class SigninController {
    constructor(
        $rootScope, $log, $state,
        APIService, AuthenticationService
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$log = $log;
        this.$state = $state;

        this.APIService = APIService;
        this.AuthenticationService = AuthenticationService;

        this.signData = {
            email: null,
            password: null,
            snsCode: '0100' // EMAIL
        };
    }

    postData() {
        let data = angular.copy(this.signData);

        /*@LOG*/ this.$log.debug(this.signData);

        this.APIService.resource('members.signin').post(data)
        .then(res => {
            /*@LOG*/ this.$log.debug(res);
            this.__resolve__(res.result.token).then(res => {
                let state = this.$rootScope.member.status === 'active' ?
                    'common.default.main' :
                    'common.default.auth-signup';

                this.$state.go(state);
            });
        }, err => {
            this.__reject__(err);
        });
    }

    /* @PRIVATE METHOD */
    __resolve__(token) {
        return this.AuthenticationService.set({
            token,
            state: null
        });
    }

    __reject__(err) {
        /*@LOG*/ this.$log.debug(err);
        alert(`[${err.status} ${err.statusText} ] - ${err.data.status.code} ${err.data.status.msg}`);
    }
}
