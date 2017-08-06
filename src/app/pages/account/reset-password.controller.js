export class ResetPasswordController {
    constructor(
        $log, $state, $stateParams, $translate,
        AuthenticationService, FormRegxService, APIService
    ) {
        'ngInject';

        this.$log = $log;
        this.$state = $state;
        this.$translate = $translate;

        this.AuthenticationService = AuthenticationService;
        this.FormRegxService = FormRegxService;
        this.APIService = APIService;

        this.code = $stateParams.code;
        this.password = {
            origin: null,
            repeat: null
        };

        this.password = null;
        this.passwordRepeat = null;

        this.passwordTestList = this.FormRegxService.getPasswordTestList();
        this.passwordScore = {
            max: this.passwordTestList.map(v => v.score).reduce((p, v) => p + v),
            score: 0,
            status: 'nothing'
        };

        this.isBusy = false;
    }

    checkPasswordAgain() {
        this.form.passwordAgain.$setValidity('notMatched', this.password.origin === this.password.repeat);
    }

    calcPasswordLevel() {
        let score = 0,
            maxScore = this.passwordScore.max,
            password = this.password.origin;


        score = this.FormRegxService.calcPasswordScore(password, maxScore);
        this.passwordScore.status = this.FormRegxService.getPasswordLevel(score);
        this.passwordScore.score = score;

        /*LOG*/ this.$log.debug('FINAL SCORE PERCENT => ', this.passwordScore.score);
    }

    postData() {
        this.isBusy = true;

        let data = {};
        data.newPassword = this.password.origin;

        this.setNewPasswordToAPI(data);
    }

    setNewPasswordToAPI(data) {
        data.code = this.code;

        this.APIService.resource('members.pwd.reset').put(data)
        .then(res => {
            this.__resolve__(res);
        }, err => {
            this.__reject__(err);
        })
        .finally(res => {
            this.isBusy = false;
        });
    }

    __resolve__(res) {
        const msg = this.$translate.instant('RESET_PASSWORD.RESULT.SUCCESS');
        alert(msg);
        this.AuthenticationService.clear('reload', 'full.default.signin');
    }

    __reject__(err) {
        const msg = this.$translate.instant('RESET_PASSWORD.RESULT.FAILED');
        alert(`${msg}(Error Code: ${err.data.status.code})`);
    }
}
