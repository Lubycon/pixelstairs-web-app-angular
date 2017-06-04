export class FindPasswordEmailController {
    constructor(
        $log, APIService, FormRegxService
    ) {
        'ngInject';

        this.$log = $log;
        this.APIService = APIService;

        this.email = null;
    }

    postEmail() {
        this.APIService.resource('members.pwd.mail').post({
            email: this.email
        }).then(res => {
            alert(true);
        }, err => {
            alert(err);
        });
    }

}
