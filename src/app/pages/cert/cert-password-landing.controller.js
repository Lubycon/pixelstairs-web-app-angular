export class CertPasswordLandingController {
    constructor(
        $log, $stateParams,
        APIService
    ) {
        'ngInject';

        this.$log = $log;

        this.isSuccess = false;
        this.isInit = false;
        this.code = $stateParams.code;

        APIService.resource('certs.password.code').post({
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
            this.msg = 'You can change your password now - ! Your registraion was finished successfully';
        }
        else {
            this.msg = 'Woo...Something is wrong. Click the button to below and please send the email Again. :(';
        }
    }
}
