class HTTPInterceptor {
    constructor() {
        ['request', 'requestError', 'response', 'responseError']
        .forEach((method) => {
            if(this[method]) {
                this[method] = this[method].bind(this);
            }
        });
    }
}

export class HTTPInterceptorService extends HTTPInterceptor {
    constructor(
        $rootScope, $injector
    ) {
        'ngInject';
        super();
        this.$rootScope = $rootScope;
        this.$injector = $injector;
    }


    response(res) {
        // HTTP STATUS 2**
        return res;
    }

    responseError(res) {
        // const $state = this.$injector.get('$state');
        const $log = this.$injector.get('$log');
        $log.debug('========================== !!!GET RESPONSE ERROR!!! ============================');
        $log.debug('status : ',res.status,' -> ',res.statusText);
        $log.debug('url : ', res.config.url);
        $log.debug('method : ',res.config.method);
        $log.debug('data : ',res.data);
        $log.debug('=================================================================================');

        res.data.httpStatus = res.status;

        // if(res.status < 0) { // CATCH CORS ERROR
        //
        // }
        // else {
        //
        // }

        return res;
    }
}
