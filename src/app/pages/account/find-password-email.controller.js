export class FindPasswordEmailController {
    constructor(
        $log, APIService, FormRegxService
    ) {
        'ngInject';

        this.$log = $log;
        this.APIService = APIService;

        this.email = null;
        this.finished = false;
    }

    postEmail() {
        this.APIService.resource('members.pwd.mail').post({
            email: this.email
        }).then(res => {
            this.finished = true;
        }, err => {
            const statusCode = err.data.status.code;
            if(statusCode === '0054') {
                alert('User is not exist');
            }
            else {
                alert('기타 오류');
            }

            this.email = null;
        });
    }

}
