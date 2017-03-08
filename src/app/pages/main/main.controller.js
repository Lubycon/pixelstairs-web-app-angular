
export class MainController {
    constructor ($log) {
        'ngInject';

        this.testCode = 'Hello World! 안녕 세계! 居時氣';
        $log.debug(this.testCode);

    }
}
