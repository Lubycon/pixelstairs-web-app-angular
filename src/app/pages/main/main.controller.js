
export class MainController {
    constructor ($log) {
        'ngInject';

        this.testCode = 'Hello World!';
        $log.debug(this.testCode);
    }
}
