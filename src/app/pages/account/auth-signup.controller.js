export class AuthSignupController {
    constructor(
        $log, APIService, $stateParams
    ) {
        'ngInject';

        this.$log = $log;
        this.APIService = APIService;

        this.certType = $stateParams.type;
        this.certCode = $stateParams.code;

        (this.init)();
    }

    init() {
        this.getLeftTime();

        if(this.certCode) this.checkCode();
    }

    getLeftTime() {
        this.APIService.resource(`certs.${this.certType}.time`).get()
        .then(res => {
            this.leftTime = res.time;
        });
    }

    checkCode() {
        this.APIService.resource(`certs.${this.certType}.code`).post({
            code: this.certCode
        }).then(res => {
            this.$log.debug(res);
        });
    }

    sendMailAgain() {
        this.$log.debug('sendEmailAgain');
    }
}
