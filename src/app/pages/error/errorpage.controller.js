
export class ErrorPageController {
    constructor(
        $log, $state, $stateParams, $translate
    ) {
        'ngInject';

        this.$log = $log;
        this.$translate = $translate;

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
}
