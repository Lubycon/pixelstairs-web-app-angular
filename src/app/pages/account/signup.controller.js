export class SignUpController {
    constructor(
        $log, APIService, AuthenticationService
    ) {
        'ngInject';

        this.$log = $log;
        this.APIService = APIService;
        this.AuthenticationService = AuthenticationService;

        this.signData = {
            email: null,
            password: {
                origin: null,
                repeat: null
            },
            nickname: null,
            gender: null,
            birthday: null,
            snsCode: '0100',
            country: 'KR',
            newsletter: false
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

        // TEST
        data.newsletterAccepted = true;
        data.termsOfServiceAccepted = true;
        delete data.birthday;
        delete data.gender;
        delete data.mobile;
        // TEST

        this.isExistMember(data.email);

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

    isExistMember(email) {
        this.APIService.resource('members.isExist').post({ email }).then(res => {
            this.$log.debug(res);
        });
    }
}
