export class CertPasswordController {
    constructor(
        $rootScope, $translate,
        APIService
    ) {
        'ngInject';

        this.$translate = $translate;
        this.APIService = APIService;

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
                // @TODO 서버에서 token을 받아야 다음 진행이 가능
                // 2017.07.30 - Evan
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
