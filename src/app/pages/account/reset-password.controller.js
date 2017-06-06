export class ResetPasswordController {
    constructor(
        $log, $stateParams
    ) {
        'ngInject';

        this.$log = $log;

        this.code = $stateParams.code;
        this.password = null;
        this.passwordRepeat = null;
    }
}
