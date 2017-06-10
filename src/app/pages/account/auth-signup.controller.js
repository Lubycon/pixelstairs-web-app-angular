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

        this.isExpired = null;

        (this.init)();
    }

    init() {
        this.getLeftTime();
    }

    getLeftTime() {
        this.APIService.resource(`certs.signup.time`).get()
        .then(res => {
            this.leftTime = res.result.time * 1000;
            if(this.leftTime < 1) {
                this.leftTime = 0;
                this.isExpired = true;
            }
            else {
                this.leftTimeDigit = this.__calcTimeDigit__(this.leftTime);
                this.isExpired = false;
                this.__countDown__();
            }


        });
    }

    sendMailAgain() {
        this.APIService.resource('certs.signup.mail').post().then(res => {
            alert('email sended');
            (this.init)();
        });
    }

    goToMain() {
        this.$state.go('common.default.main');
    }

    __countDown__() {
        if(!this.isExpired) {
            this.$interval.cancel(this.countInterval);
            this.countInterval = this.$interval(() => {
                this.leftTime -= 1000;
                this.leftTimeDigit = this.__calcTimeDigit__(this.leftTime);
            }, 1000);
        }
    }

    __calcTimeDigit__(milsecond) {
        return moment.duration(milsecond);
    }
}
