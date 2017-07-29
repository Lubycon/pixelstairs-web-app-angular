export class CertSignupLandingController {
    constructor(
        $rootScope, $log, $translate,
        $state, $stateParams,
        APIService
    ) {
        'ngInject';

        this.$log = $log;
        this.$translate = $translate;
        this.$state = $state;

        this.isSuccess = false;
        this.isInit = false;

        this.userEmail = $rootScope.member.email;
        this.code = $stateParams.code;

        APIService.resource('certs.signup.code').post({
            code: this.code
        }).then(res =>{
            (this.init)(res.result.validity);
        }, err => {
            (this.init)(false);
        });
    }

    init(isSuccess) {
        this.isInit = true;

        this.isSuccess = isSuccess;
        if(this.isSuccess) {
            this.title = this.$translate.instant('CERT_SIGNUP_LANDING.TITLE.SUCCESS');
            this.msg = this.$translate.instant('CERT_SIGNUP_LANDING.MSG.SUCCESS');
        }
        else {
            this.title = this.$translate.instant('CERT_SIGNUP_LANDING.TITLE.FAILED');
            this.msg = this.$translate.instant('CERT_SIGNUP_LANDING.MSG.FAILED');
        }
    }

    goToMain() {
        this.$state.go('common.default.main');
    }
}
