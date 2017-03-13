export class SignUpController {
    constructor(
        $log, APIService
    ) {
        'ngInject';

        this.$log = $log;
        this.APIService = APIService;

        this.signData = {
            email: null,
            mobile: null,
            password: {
                origin: null,
                repeat: null
            },
            nickname: null,
            gender: null,
            birthday: null
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
        /*@LOG*/ this.$log.debug(this.signData);
    }

    checkPasswordAgain() {
        let isMatched = this.signData.password.origin === this.signData.password.repeat;
        /*@LOG*/ this.$log.debug(this.signData.password.origin, this.signData.password.repeat, isMatched);
    }
}
