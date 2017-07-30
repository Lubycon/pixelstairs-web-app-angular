export class SigndropController {
    constructor(
        $translate,
        FORM_CONSTANT,
        APIService, AuthenticationService
    ) {
        'ngInject';

        this.$translate = $translate;

        this.APIService = APIService;
        this.AuthenticationService = AuthenticationService;

        this.isBusy = false;
        this.signdropReasons = FORM_CONSTANT.SIGN_DROP_REASONS;
        this.signdropData = {
            reason: {
                good: null,
                bad: null
            }
        };
    }

    postData() {
        let data = angular.copy(this.signdropData);

        this.isBusy = true;
        this.APIService.resource('members.signdrop').delete(data)
        .then(res => {
            this.AuthenticationService.clearForce('reload');
            let msg = this.$translate.instant('SIGN_DROP.SUCCESS');
            alert(msg);
        }, err => {
            let msg = this.$translate.instant('ALERT_ERROR.SIGNDROP.FAILED');
            alert(msg);
        })
        .finally(res => {
            this.isBusy = false;
        });
    }
}
