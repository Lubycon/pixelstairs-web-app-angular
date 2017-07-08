export class CertSignupLandingController {
    constructor(
        $log, $translate,
        $state, $stateParams,
        APIService
    ) {
        'ngInject';

        this.$log = $log;
        this.$translate = $translate;
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
            this.msg = this.$translate.instant('CERT_SIGNUP_LANDING.MSG.SUCCESS');
        }
        else {
            this.msg = this.$translate.instant('CERT_SIGNUP_LANDING.MSG.FAILED');
        }
    }

    goToMain() {
        this.$state.go('common.default.main');
    }
}
