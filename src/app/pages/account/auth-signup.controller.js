export class AuthSignupController {
    constructor(
        $rootScope, $log, $interval,
        APIService, $state
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$log = $log;
        this.$interval = $interval;
        this.$state = $state;

        this.APIService = APIService;

        (this.init)();
    }

    init() {
        this.getLeftTime();

        if(this.certCode) this.checkCode();
    }

    getLeftTime() {
        this.APIService.resource(`certs.signup.time`).get()
        .then(res => {

            this.leftTime = res.result.time * 1000;
            this.leftTimeDigit = this.__calcTimeDigit__(this.leftTime);
        });

        this.$interval.cancel();
        this.$interval(() => {
            this.leftTime -= 1000;
            this.leftTimeDigit = this.__calcTimeDigit__(this.leftTime);
        }, 1000);
    }

    checkCode() {
        this.APIService.resource(`certs.signup.code`).post({
            code: this.certCode
        }).then(res => {
            this.$log.debug(res);
        });
    }

    sendMailAgain() {
        this.APIService.resource('certs.signup.mail').post().then(res => {
            console.log(res);
        });
    }

    goToMain() {
        this.$state.go('common.default.main');
    }

    __calcTimeDigit__(milsecond) {
        return moment.duration(milsecond);
    }
}
