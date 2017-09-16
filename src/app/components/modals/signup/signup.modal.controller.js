import { SignupController } from '../../../pages/account/signup.controller';

export class SignupModalController extends SignupController {
    constructor (
        $rootScope, $scope, $log, $state, $translate, $uibModalInstance,
        APIService, AuthenticationService, FormRegxService
    ) {
        'ngInject';

        super($rootScope, $log, $state, $translate, APIService, AuthenticationService, FormRegxService);
        this.$scope = $scope;
        this.$uibModalInstance = $uibModalInstance;
    }

    postData() {
        let data = angular.copy(this.signData);
            data.password = data.password.origin;
        /*@LOG*/ this.$log.debug(data);

        this.isBusy = true;

        data.newsletterAccepted = true;
        data.termsOfServiceAccepted = true;

        this.APIService.resource('members.signup').post(data).then(res => {
            this.AuthenticationService.set({
                token: res.result.token,
                state: null
            }).then(res => {
                this.isBusy = false;
                this.close();
                this.$state.go('common.default.auth-signup');
            });
        }, err => {
            this.isBusy = false;
            /*@LOG*/ this.$log.debug('SIGN UP IS FAILED => ', err);

            let msg = this.$translate.instant('ALERT_ERROR.SIGNUP.FAILED');

            alert(msg);
        });
    }

    gotoSignin () {
        this.close();
        this.$state.go('full.default.signin');
    }

    close () {
        this.$uibModalInstance.dismiss('cancel');
    }
}
