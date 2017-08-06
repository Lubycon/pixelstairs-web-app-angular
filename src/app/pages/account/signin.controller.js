export class SigninController {
    constructor(
        $rootScope, $log, $state, $translate,
        APIService, AuthenticationService
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$log = $log;
        this.$state = $state;
        this.$translate = $translate;

        this.APIService = APIService;
        this.AuthenticationService = AuthenticationService;

        this.signData = {
            email: null,
            password: null,
            snsCode: '0100' // EMAIL
        };

        this.isBusy = false;
    }

    postData() {
        if(this.form.$invalid) {
            let msg = 'Unknown Error';
            if(this.form.email.$invalid) {
                msg = this.$translate.instant('ALERT_ERROR.SIGNIN.EMAIL');
            }
            else if(this.form.password.$invalid) {
                msg = this.$translate.instant('ALERT_ERROR.SIGNIN.PASSWORD');
            }
            alert(msg);

            return false;
        }

        let data = angular.copy(this.signData);
        this.isBusy = true;
        /*@LOG*/ this.$log.debug(this.signData);

        this.APIService.resource('members.signin').post(data)
        .then(res => {
            /*@LOG*/ this.$log.debug(res);

            this.__resolve__(res.result.token).then(res => {
                let state = this.$rootScope.member.status === 'active' ?
                    'common.jumbo.main' :
                    'common.default.auth-signup';

                this.$state.go(state);
            });
        }, err => {
            this.__reject__(err);
        });
    }

    /* @PRIVATE METHOD */
    __resolve__(token) {
        this.isBusy = false;
        return this.AuthenticationService.set({
            token,
            state: null
        });
    }

    __reject__(err) {
        let msg = this.$translate.instant('ALERT_ERROR.SIGNIN.FAILED');
        this.isBusy = false;
        alert(msg);
    }
}
