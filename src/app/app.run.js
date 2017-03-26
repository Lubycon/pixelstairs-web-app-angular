export function run (
    $rootScope, $log, $q, AppSettingService, HistoryService,
    TrackerService, StateAuthenticationService, AuthenticationService,
    $anchorScroll, $window, $document, USER_AGENT
) {
    'ngInject';

    $rootScope.deviceInfo = USER_AGENT;

    /*@INIT*/
    let initPromise = $q.all;
    initPromise({
        appSetting: AppSettingService.init(),
        authenticate: AuthenticationService.init()
    }).then(res => {
        $log.debug('APP INIT IS DONE!!', res);
        $rootScope.Initialized = true;

        __disableScrollBySpace__($window, $document);

        /*@STATE*/
        $rootScope.$on('$stateChangeStart', () => {
            $log.debug(1);
            __hideModalWindow__();
        });

        $rootScope.$on('$stateChangeSuccess', (
            event, toState, toParams, fromState, fromParams
        ) => {
            fromState.params = fromParams;
            toState.params = toParams;
            fromState = __generateURL__(fromState, $document);
            toState = __generateURL__(toState, $document);

            HistoryService.push({
                from : fromState,
                to : toState
            });

            TrackerService.post(toState, fromState);
            StateAuthenticationService.detect(toState);

            $anchorScroll();
        });

        /*@LOG*/ $log.debug('ROOT SCOPE => ', $rootScope);
        /*@LOG*/ $log.debug('***================================ RUN BLOCK END ================================***');
    });
}


/*@PRIVATE METHOD*/
function __disableScrollBySpace__($window, $document) {
    $window.onkeydown = event => {
        if(event.keyCode === 32 && event.target == $document.body) {
            event.preventDefault();
            return false;
        }
    };
}

function __hideModalWindow__() {
    // angular.element('.modal[role="dialog"]').modal('hide');
    // angular.element('body').removeClass('modal modal-open');
    // angular.element('.modal-backdrop').remove();
}

function __generateURL__(param, $document) {
    const key = Object.keys(param.params);
    let url = param.url;
        url = url === '^' ? $document[0].referrer : param.url;

    url = url.replace(/\:/g,'');
    key.forEach(v => {
        url = url.replace(v,param.params[v]);
    });

    param.url = url;

    return param;
}
