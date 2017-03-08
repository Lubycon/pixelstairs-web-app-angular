
export class MainController {
    constructor ($log) {
        'ngInject';

        this.testCode = 'Hello World! 안녕 세계! 你好，世界！';
        $log.debug(this.testCode);

    }
}
