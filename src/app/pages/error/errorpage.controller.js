
export class ErrorPageController {
    constructor(
        $log, $state, $stateParams, $translate,
        $location, getQuotesRsv
    ) {
        'ngInject';

        this.$log = $log;
        this.$state = $state;
        this.$translate = $translate;
        this.$location = $location;

        this.httpStatus = $stateParams.httpStatus;
        this.errorMsg = $translate.instant(`HTTP.${this.httpStatus}`);
        this.wiseword = {
            text: getQuotesRsv.result.message,
            author: getQuotesRsv.result.author
        };

        (this.init)();
    }

    init() {
        this.wiseword.text = '"' + this.wiseword.text + '"';
    }

    gotoBack() {
        const ref = document.referrer;
        if(ref.indexOf(this.$location.host()) > -1 && ref.indexOf(this.$location.path()) < 0) {
            this.$location.href = document.referrer;
        }
        else {
            this.$state.go('common.jumbo.main');
        }
    }
}
