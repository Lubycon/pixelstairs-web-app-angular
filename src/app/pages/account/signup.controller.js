export class SignupController {
    constructor(
        $rootScope, $log, $state,
        APIService, AuthenticationService, FormRegxService
    ) {
        'ngInject';

        this.$log = $log;
        this.$state = $state;

        this.APIService = APIService;
        this.AuthenticationService = AuthenticationService;
        this.FormRegxService = FormRegxService;

        this.lang = $rootScope.setting.language.split('-')[0];

        this.signData = {
            email: null,
            password: {
                origin: null,
                repeat: null
            },
            nickname: null,
            gender: null,
            birthday: null,
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

        this.genders = [{
            name: 'Male',
            code: 'M'
        },{
            name: 'Female',
            code: 'F'
        },{
            name: 'etc',
            code: 'E'
        }];

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

        data.newsletterAccepted = true;
        data.termsOfServiceAccepted = true;

        this.APIService.resource('members.signup').post(data).then(res => {
            this.AuthenticationService.set({
                token: res.result.token,
                state: null
            }).then(res => {
                this.$state.go('common.default.auth-signup');
            });
        }, err => {
            /*@LOG*/ this.$log.debug('SIGN UP IS FAILED => ', err);
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

        /*LOG*/ this.$log.debug('FINAL SCORE PERCENT => ', this.passwordScore.score);
    }
}
