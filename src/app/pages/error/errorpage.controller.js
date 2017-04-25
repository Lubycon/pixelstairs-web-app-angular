
export class ErrorPageController {
    constructor(
        $log, $state, $stateParams
    ) {
        'ngInject';

        this.$log = $log;
        this.httpStatus = $stateParams.httpStatus;

        (this.init)();
    }

    init() {
        console.log(this.httpStatus);
    }
}
