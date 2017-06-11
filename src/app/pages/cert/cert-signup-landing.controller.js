export class CertSignupLandingController {
    constructor(
        $log, APIService,
        $state, $stateParams
    ) {
        'ngInject';

        this.$log = $log;
        this.$state = $state;

        this.isSuccess = false;
        this.isInit = false;
        this.code = $stateParams.code;

        APIService.resource('certs.signup.code').post({
            code: this.code
        }).then(res =>{
            (this.init)(true);
        }, err => {
            (this.init)(false);
        });
    }

    init(isSuccess) {
        this.isInit = true;

        this.isSuccess = isSuccess;
        if(this.isSuccess) {
            this.msg = 'You are a active user now';
        }
        else {
            this.msg = 'Woo...Something is wrong. Click the button to below and please send the email Again. :(';
        }
    }

    goToMain() {
        this.$state.go('common.default.main');
    }
}
