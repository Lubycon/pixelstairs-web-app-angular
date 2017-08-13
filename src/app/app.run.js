export function run (
    $rootScope, $log, $q, AppSettingService, HistoryService,
    TrackerService, AuthenticationService,
    ErrorCatcherService, PermissionService,
    $anchorScroll, $window, $document, $state, $timeout, USER_AGENT
) {
    'ngInject';

    $rootScope.deviceInfo = USER_AGENT;

    function AppBoot() {
        const initStarter = () => {
            let defer = $q.defer();
            defer.resolve();
            return defer.promise;
        };

        /* app init start */
        return initStarter()
        .then(res => { return AuthenticationService.init(); })
        .then(res => {
            $rootScope.$broadcast('update-member-data');
            PermissionService.init();
            return AppSettingService.init();
        })
        .then(res => {
            /*LOG*/ $log.debug('APP INIT IS DONE!!', res);
            $rootScope.Initialized = true;
            __disableScrollBySpace__($window, $document);

            /*@LOG*/ $log.debug('ROOT SCOPE => ', $rootScope);
            /*@LOG*/ $log.debug('***================================ RUN BLOCK END ================================***');
        });
        /* app init end */
    }

    /*@STATE*/
    $rootScope.$on('$stateChangeStart', (
        event, toState, toParams, fromState, fromParams
    ) => {
        if($rootScope.Initialized) {
            __hideModalWindow__();
            return;
        }
        else {
            event.preventDefault();
            AppBoot().then(res => {
                $state.go(toState, toParams);
            });
        }
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

        __setStateClassToBody__(toState);
        __hideGlobalLoading__();
        $anchorScroll();
    });

    $rootScope.$on('$stateChangeError', (
        event, toState, toParams, fromState, fromParams
    ) => {
        $state.go('common.default.error', {
            httpStatus: 500
        });
    });
}

/*@PRIVATE METHOD*/
function __hideGlobalLoading__() {
    $('.global-loading-wrapper').stop().fadeOut(1000);
}

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

    key.forEach(v => {
        url = url.replace(`:${v}`, param.params[v]);
    });

    param.url = url;

    return param;
}

function __setStateClassToBody__(toState) {
    const BODY_CLASS = toState.name
    .replace(/^(common|aside|full)\.(default|jumbo|figure|noFooter)\./g,'state-')
    .replace(/(\.|\_)/gi,'-');

    angular.element('body').removeClass().addClass(BODY_CLASS);
}
