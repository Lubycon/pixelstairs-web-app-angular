export class SigndropController {
    constructor(
        FORM_CONSTANT,
        APIService
    ) {
        'ngInject';

        this.APIService = APIService;

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
        console.log(data);

        // this.APIService.resource('members.signdrop').delete(this.postData)
        // .then(res => {
        //     console.log(res);
        // });
    }
}
