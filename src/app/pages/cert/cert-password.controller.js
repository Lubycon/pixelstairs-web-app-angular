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

        this.APIService.resource('certs.password.check').post(data)
        .then(res => {
            if(res.result.validity) {
                this.$state.go('common.default.change-password');
            }
            else {
                let msg = this.$translate.instant('CERT_PASSWORD.FAILED');
                alert(msg);
            }
        }, err => {
            let msg = this.$translate.instant('CERT_PASSWORD.FAILED');
            alert(msg);
        })
        .finally(res => {
            this.isBusy = false;
        });
    }
}
