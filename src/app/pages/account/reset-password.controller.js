export class ResetPasswordController {
    constructor(
        $log, $state, $stateParams, $translate,
        FormRegxService, APIService
    ) {
        'ngInject';

        this.$log = $log;
        this.$state = $state;
        this.$translate = $translate;

        this.FormRegxService = FormRegxService;
        this.APIService = APIService;

        this.code = $stateParams.code;
        this.isChangePasswordPage = this.$state.is('common.default.change-password');
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

        if(this.isChangePasswordPage) {
            this.setNewPassword(data);
        }
        else {
            this.setMissingPassword(data);
        }
    }

    setMissingPassword(data) { // 패스워드 분실 시
        data.code = this.code;

        this.APIService.resource('members.pwd.reset').put(data)
        .then(res => {
            this.__resolve__(res);
            this.$state.go('full.default.signin');
        }, err => {
            this.__reject__(err);
        })
        .finally(res => {
            this.isBusy = false;
        });
    }

    setNewPassword(data) { // 패스워드 변경 시
        this.APIService.resource('members.pwd.change').put(data)
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
    }

    __reject__(err) {
        const msg = this.$translate.instant('RESET_PASSWORD.RESULT.FAILED');
        alert(`${msg}(Error Code: ${err.data.status.code})`);
    }
}
