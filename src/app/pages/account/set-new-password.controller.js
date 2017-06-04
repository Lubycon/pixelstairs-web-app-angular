export class SetNewPasswordController {
    constructor(
        $log, $stateParams,
        APIService, FormRegxService
    ) {
        'ngInject';

        this.$log = $log;
        this.code = $stateParams.code;

        this.APIService = APIService;
    }
}
