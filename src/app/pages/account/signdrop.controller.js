export class SigndropController {
    constructor(
        $rootScope, $translate,
        FORM_CONSTANT, getReasonRsv,
        APIService, AuthenticationService
    ) {
        'ngInject';

        this.$translate = $translate;

        this.APIService = APIService;
        this.AuthenticationService = AuthenticationService;

        this.lang = $rootScope.setting.language.split('-')[0];
        this.isBusy = false;
        this.surveyList = getReasonRsv.result;

        this.signdropData = {
            answerIds: []
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
