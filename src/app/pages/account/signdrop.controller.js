export class SigndropController {
    constructor(
        FORM_CONSTANT,
        APIService
    ) {
        'ngInject';

        this.signdropReasons = FORM_CONSTANT.SIGN_DROP_REASONS;
    }
}
