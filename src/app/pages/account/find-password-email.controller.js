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
            const statusCode = err.data.status.code;
            if(statusCode === '0054') {
                alert('존재하지 않는 회원입니다.');
            }
            else {
                alert('기타 오류');
            }

            this.email = null;
        });
    }

}
