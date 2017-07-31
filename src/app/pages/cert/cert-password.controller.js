export class CertPasswordController {
    constructor(
        $rootScope, $translate, $state,
        APIService
    ) {
        'ngInject';

        this.$translate = $translate;
        this.APIService = APIService;
        this.$state = $state;

        this.isBusy = false;
        this.certData = {
            email: $rootScope.member.email,
            password: null
        };
    }

    postData() {
        this.isBusy = true;
        let data = angular.copy(this.certData);

        this.checkPasswordToAPI(data)
        .then(res => {
            if(res.result.validity) {
                this.createTokenToAPI();
            }
            else {
                this.__reject__();
            }
        }, err => {
            this.__reject__();
        });
    }

    checkPasswordToAPI(data) {
        return this.APIService.resource('certs.password.check').post(data);
    }

    createTokenToAPI() {
        return this.APIService.resource('members.pwd.token').post()
        .then(res => {
            this.$state.go('common.default.reset-password', {
                code: res.result.token
            });
        }, err => {
            this.__reject__();
        }).finally(res => {
            this.isBusy = false;
        });
    }

    __reject__() {
        let msg = this.$translate.instant('CERT_PASSWORD.FAILED');
        alert(msg);
        this.isBusy = false;
    }
}
