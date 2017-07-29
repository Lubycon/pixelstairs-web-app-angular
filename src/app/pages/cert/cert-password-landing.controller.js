export class CertPasswordLandingController {
    constructor(
        $log, $stateParams, $translate,
        APIService
    ) {
        'ngInject';

        this.$log = $log;
        this.$translate = $translate;

        this.isSuccess = false;
        this.isInit = false;
        this.code = $stateParams.code;

        APIService.resource('certs.password.code').post({
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
            this.title = this.$translate.instant('CERT_PASSWORD_LANDING.TITLE.SUCCESS');
            this.msg = this.$translate.instant('CERT_PASSWORD_LANDING.MSG.SUCCESS');
        }
        else {
            this.title = this.$translate.instant('CERT_PASSWORD_LANDING.TITLE.FAILED');
            this.msg = this.$translate.instant('CERT_PASSWORD_LANDING.MSG.FAILED');
        }
    }
}
