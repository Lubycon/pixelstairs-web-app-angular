export class SignInController {
    constructor(
        $log, APIService, AuthenticationService
    ) {
        'ngInject';

        this.$log = $log;
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
            this.__resolve__(res.result.token);
        }, err => {
            this.__reject__(err);
        });
    }

    /* @PRIVATE METHOD */
    __resolve__(token) {
        this.AuthenticationService.set({
            token,
            state: null
        });
    }

    __reject__(err) {
        /*@LOG*/ this.$log.debug(err);
        alert(`[${err.status} ${err.statusText} ] - ${err.data.status.code} ${err.data.status.msg}`);
    }
}
