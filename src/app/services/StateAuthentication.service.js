export class StateAuthenticationService {
    constructor(
        $rootScope, $state, $timeout, $log
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$timeout = $timeout;
        this.$log = $log;
    }


    detect(toState) {
        const IS_SIGNED = this.$rootScope.authStatus && this.$rootScope.authStatus.sign;

        switch(toState.authenticate) {
            case 'all':
                this.__stateChangeResolve__(toState);
            break;
            case 'visitor':
                if(!IS_SIGNED) this.__stateChangeResolve__(toState);
                else this.__stateChangeReject__('common.default.main');
            break;
            case 'member:active':
                if(IS_SIGNED) this.__stateChangeResolve__(toState);
                else this.__stateChangeReject__();
            break;
            case 'member:inactive':
                if(IS_SIGNED) this._stateChangeResolve__(toState);
                else this.__stateChangeReject__();
            break;
            case 'close':
                this.__stateChangeReject__('full.default.error', {
                    code: '404'
                });
            break;
            default: this.__stateChangeResolve__(toState); break;
        }
    }


    /* @PRIVATE METHOD */
    __stateChangeReject__(target, params) {
        this.$timeout(() => {
            if(!target) this.$state.go('full.default.signin');
            else this.$state.go(target, params);
        });
    }

    __stateChangeResolve__(toState) {
        const BODY_CLASS = toState.name
            .replace(/^(common|aside|full)\.(default|figure|noFooter)\./g,'state-')
            .replace(/(\.|\_)/gi,'-');

        angular.element('body').removeClass().addClass(BODY_CLASS);
    }
}
