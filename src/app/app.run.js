

export function run (
    $rootScope, $log, AppSettingService, HistoryService,
    TrackerService, StateAuthenticationService,
    $anchorScroll, $window, $document, USER_AGENT
) {
    'ngInject';

    $rootScope.deviceInfo = USER_AGENT;

    /*@INIT*/
    AppSettingService.init();

    disableScrollBySpace($window, $document);

    /*@STATE*/
    $rootScope.$on('$stateChangeStart',
    () => {
        hideModalWindow();
    });

    $rootScope.$on('$stateChangeSuccess',
    (event, toState, toParams, fromState, fromParams) => {
        fromState.params = fromParams;
        toState.params = toParams;
        fromState = generateURL(fromState, $document);
        toState = generateURL(toState, $document);

        HistoryService.push({
            from : fromState,
            to : toState
        });

        TrackerService.post(toState, fromState);
        StateAuthenticationService.detect(toState);

        $anchorScroll();
    });

    /*@LOG*/ $log.debug('ROOT SCOPE => ', $rootScope);
    /*@LOG*/ $log.debug('================================ RUN BLOCK END ================================');
}


/*@PRIVATE METHOD*/
function disableScrollBySpace($window, $document) {
    $window.onkeydown = event => {
        if(event.keyCode === 32 && event.target == $document.body) {
            event.preventDefault();
            return false;
        }
    };
}

function hideModalWindow() {
    // angular.element('.modal[role="dialog"]').modal('hide');
    // angular.element('body').removeClass('modal modal-open');
    // angular.element('.modal-backdrop').remove();
}

function generateURL(param, $document) {
    var key = Object.keys(param.params),
        url = url === '^' ? $document.referrer : param.url;

    url = url.replace(/\:/g,'');
    key.forEach(v => {
        url = url.replace(v,param.params[v]);
    });

    param.url = url;

    return param;
}
