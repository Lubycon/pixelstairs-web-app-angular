export class SignupController {
    constructor(
        $rootScope, $log, $state, $translate,
        APIService, AuthenticationService, FormRegxService
    ) {
        'ngInject';

        this.$log = $log;
        this.$state = $state;
        this.$translate = $translate;

        this.APIService = APIService;
        this.AuthenticationService = AuthenticationService;
        this.FormRegxService = FormRegxService;

        this.lang = $rootScope.setting.language.split('-')[0];
        this.isBusy = false;

        this.signData = {
            email: null,
            password: {
                origin: null,
                repeat: null
            },
            nickname: null,
            newsletterAccepted: false,
            termsOfServiceAccepted: false
        };

        this.passwordTestList = this.FormRegxService.getPasswordTestList();
        this.passwordScore = {
            max: this.passwordTestList.map(v => v.score).reduce((p, v) => p + v),
            score: 0,
            status: 'nothing'
        };

        this.datePopup = {
            isOpen: false
        };

        this.selectBoxOption = {
            containerCssClass: 'custom-select2 full-width',
            dropdownCssClass: 'custom-select2',
            minimumResultsForSearch: -1
        };
    }

    postData() {
        let data = angular.copy(this.signData);
            data.password = data.password.origin;
        /*@LOG*/ this.$log.debug(data);

        this.isBusy = true;

        data.newsletterAccepted = true;
        data.termsOfServiceAccepted = true;

        this.APIService.resource('users.signup').post(data).then(res => {
            this.AuthenticationService.set({
                token: res.result.token,
                state: null
            }).then(res => {
                this.isBusy = false;
                this.$state.go('common.default.auth-signup');
            });
        }, err => {
            this.isBusy = false;
            /*@LOG*/ this.$log.debug('SIGN UP IS FAILED => ', err);

            let msg = this.$translate.instant('ALERT_ERROR.SIGNUP.FAILED');

            alert(msg);
        });
    }

    checkPasswordAgain() {
        this.form.passwordAgain.$setValidity('notMatched', this.signData.password.origin === this.signData.password.repeat);
    }

    calcPasswordLevel() {
        let score = 0,
            maxScore = this.passwordScore.max,
            password = this.signData.password.origin;

        score = this.FormRegxService.calcPasswordScore(password, maxScore);
        this.passwordScore.status = this.FormRegxService.getPasswordLevel(score);
        this.passwordScore.score = score;

        if(score <= 30 ) {
            this.form.password.$setValidity('lowSecure', false);
        }
        else {
            this.form.password.$setValidity('lowSecure', true);
        }
        /*LOG*/ this.$log.debug('FINAL SCORE PERCENT => ', this.passwordScore.score);
    }

    isExist(prop) {
        let data = {};
        data[prop] = this.signData[prop];

        this.APIService.resource(`users.exists.${prop}`).post(data)
        .then(res => {
            this.form[prop].$setValidity('exist', !res.result);
        }, err => {
            this.form[prop].$setValidity('exist', true);
            return false;
        });
    }
}
