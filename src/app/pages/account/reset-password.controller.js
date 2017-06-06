export class ResetPasswordController {
    constructor(
        $log, $state, $stateParams,
        FormRegxService, APIService
    ) {
        'ngInject';

        this.$log = $log;
        this.$state = $state;

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
        let data = {};
        data.newPassword = this.password.origin;
        data.code = this.code;

        this.APIService.resource('members.pwd.reset').put(data)
        .then(res => {
            alert('DEBUG::password change success');
            this.$state.go('full.default.signin');
        }, err => {
            alert(`ERR::${err.data.status.code}-${err.data.status.devMsg}`);
        });
    }
}
