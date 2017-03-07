
export class MainController {
    constructor ($log, CookieService) {
        'ngInject';

        this.testCode = 'Hello World! 안녕 세계! 居時氣';

        console.log(CookieService._encode('test'))
    }
}
