/*
    @name: ErrorCatcherService
    @desc: Override $exceptionHandler - Angular build-in service
    @author: Evan Moon
    @created_at: 2017-06-19
*/

export class ErrorCatcherService {
    constructor(
        $log
    ) {
        'ngInject';

        this.$log = $log;
        this.error = {};
    }

    catcher(exception, cause) {
        this.error = {
            exception,
            cause
        };

        this.$log.error(exception, cause);
    }
}
