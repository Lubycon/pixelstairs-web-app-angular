export class CertPasswordController {
    constructor(
        $rootScope,
        FormRegxService
    ) {
        'ngInject';

        this.FormRegxService = FormRegxService;

        this.isBusy = false;
        this.certData = {
            email: $rootScope.member.email,
            password: null
        };
    }

    postData() {
        console.log(this.certData);
    }

    checkPasswordAgain() {
        this.form.passwordAgain.$setValidity('notMatched', this.certData.password.origin === this.certData.password.repeat);
    }
}
