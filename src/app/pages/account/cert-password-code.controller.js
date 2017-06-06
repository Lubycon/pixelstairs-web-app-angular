export class CertPasswordCodeController {
    constructor(
        $log, $stateParams,
        APIService
    ) {
        'ngInject';

        this.$log = $log;

        this.isSuccess = false;
        this.isInit = false;

        APIService.resource('certs.password.code').post({
            code: $stateParams.code
        }).then(res =>{
            (this.init)({
                result: res.result,
                status: res.status
            });
        }, err => {
            (this.init)({
                result: null,
                status: err.data.status
            });
        });
    }

    init(result) {
        this.isInit = true;

        this.isSuccess = result.status.code === '0000';
        if(this.isSuccess) {
            this.msg = 'You can change your password now - ! Your registraion was finished successfully';
        }
        else {
            this.msg = 'Woo...Something is wrong. Click the button to below and please send the email Again. :(';
        }
    }
}
