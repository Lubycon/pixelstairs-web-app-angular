export class CertSignupLandingController {
    constructor(
        $rootScope, $log, $translate,
        $state, $stateParams,
        APIService, AuthenticationService
    ) {
        'ngInject';

        this.$log = $log;
        this.$translate = $translate;
        this.$state = $state;

        this.isSuccess = false;
        this.isInit = false;

        this.code = $stateParams.code;
        this.isAuthenticated = $rootScope.authStatus.sign;

        this.AuthenticationService = AuthenticationService;

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
        this.AuthenticationService.update({
            name: 'common.jumbo.main'
        });
    }

    goToSignin() {
        this.$state.go('full.default.singin');
    }
}
