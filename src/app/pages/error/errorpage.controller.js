
export class ErrorPageController {
    constructor(
        $log, $state, $stateParams, $translate,
        $location
    ) {
        'ngInject';

        this.$log = $log;
        this.$state = $state;
        this.$translate = $translate;
        this.$location = $location;

        this.httpStatus = $stateParams.httpStatus;
        this.errorMsg = $translate.instant(`HTTP.${this.httpStatus}`);
        this.wiseword = {
            text: 'Imagination is more important than knowledge. Knowedge is limited. Imagination encircles the world',
            author: 'Albert einstein [Smithsonian, February 1979]'
        };

        (this.init)();
    }

    init() {
        console.log(this.errorMsg);
        this.wiseword.text = '"' + this.wiseword.text + '"';
    }

    gotoBack() {
        if(document.referrer.indexOf(this.$location.host()) < 0) {
            this.$state.go('common.default.main');
        }
        else {
            this.$location.href = document.referrer;
        }
    }
}
