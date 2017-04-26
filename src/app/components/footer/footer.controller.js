export class FooterController {
    constructor(
        $log
    ) {
        'ngInject';

        this.$log = $log;

        $log.debug('FOOTER CONTROLLER IS LOADED!');
    }
}
