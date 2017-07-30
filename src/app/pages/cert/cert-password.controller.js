export class CertPasswordController {
    constructor(
        $rootScope,
        APIService
    ) {
        'ngInject';

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
                alert('true');
            }
            else {
                alert('false');
            }
        }, err => {
            alert('false');
        })
        .finally(res => {
            this.isBusy = false;
        });
    }
}
