export class ContentsDetailController {
    constructor($log, getContentRsv) {
        'ngInject';

        this.$log = $log;

        this.dummy = getContentRsv;

        $log.debug('CONTENT DETAIL PAGE IS LOADED', this.dummy);
    }
}
