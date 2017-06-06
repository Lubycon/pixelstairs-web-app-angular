export class FindPasswordEmailController {
    constructor(
        $log, APIService, FormRegxService
    ) {
        'ngInject';

        this.$log = $log;
        this.APIService = APIService;

        this.email = null;
        this.isFinished = false;
        this.isBusy = false;
    }

    postEmail() {
        this.isBusy = true;
        this.APIService.resource('members.pwd.mail').post({
            email: this.email
        }).then(res => {
            this.isFinished = true;
            this.isBusy = false;
        }, err => {
            const statusCode = err.data.status.code;
            if(statusCode === '0054') {
                alert('User is not exist');
            }
            else {
                alert('기타 오류');
            }

            this.isBusy = false;
            this.email = null;
        });
    }

}
