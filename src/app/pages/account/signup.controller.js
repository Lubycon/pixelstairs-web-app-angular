export class SignUpController {
    constructor(
        $log, APIService, AuthenticationService,
        FormRegxService
    ) {
        'ngInject';

        this.$log = $log;
        this.APIService = APIService;
        this.AuthenticationService = AuthenticationService;
        this.FormRegxService = FormRegxService;

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

        if(!this.validate(data)) return false;

        this.APIService.resource('members.signup').post(data).then(res => {
            if(res && res.status.code === '0000') {
                this.AuthenticationService.set(res.result.token);
            }
            else {
                /*@LOG*/ this.$log.debug('SIGN UP IS FAILED => ', res);
            }
        }, err => {
            /*@LOG*/ this.$log.debug('SIGN UP IS FAILED => ', err);
        });
    }

    checkPasswordAgain() {
        let isMatched = this.signData.password.origin === this.signData.password.repeat;
        /*@LOG*/ this.$log.debug(this.signData.password.origin, this.signData.password.repeat, isMatched);
    }

    calcPasswordLevel() {
        let score = 0,
            maxScore = this.passwordScore.max,
            password = this.signData.password.origin;


        this.passwordScore.score = this.FormRegxService.calcPasswordLevel(password, maxScore);

        if(this.passwordScore.score >= 100) {
            this.passwordScore.status = 'perfect';
        }
        else if(this.passwordScore.score > 80) {
            this.passwordScore.status = 'high';
        }
        else if(this.passwordScore.score > 30) {
            this.passwordScore.status = 'mid';
        }
        else {
            this.passwordScore.status = 'low';
        }

        /*LOG*/ this.$log.debug('FINAL SCORE PERCENT => ', this.passwordScore.score);
    }

    validate(data) {

    }
}
