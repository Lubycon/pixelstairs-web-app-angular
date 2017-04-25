
export class ErrorPageController {
    constructor(
        $log, $state, $stateParams, $translate
    ) {
        'ngInject';

        this.$log = $log;
        this.$translate = $translate;

        this.httpStatus = $stateParams.httpStatus;
        this.errorMsg = $translate.instant(`HTTP.${this.httpStatus}`);

        (this.init)();
    }

    init() {
        console.log(this.errorMsg);
    }
}
