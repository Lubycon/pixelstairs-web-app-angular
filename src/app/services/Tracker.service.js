/* @PRIVATE MEMEBER */
const TRACKER_API = 'tracker';
/* @PRIVATE MEMEBER */

export class TrackerService {
    constructor(
        $rootScope, $state, $filter, $log,
        CookieService, Restangular, UUIDService, APIService,
        CUSTOM_HEADER_PREFIX
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$filter = $filter;
        this.$log = $log;

        this.CookieService = CookieService;
        this.Restangular = Restangular;
        this.UUIDService = UUIDService;
        this.APIService = APIService;

        this.CUSTOM_HEADER_PREFIX = CUSTOM_HEADER_PREFIX;

        this.__tracker__ = {};
        this.today = $filter('date')(new Date(), 'yyyyMMdd');
        this.UUID = this.__setUUID__(CookieService.get('TRACKER'));
    }


    init() {
        this.__tracker__.action = 0;
    }

    post(toState, fromState) {
        this.init();

        let tmp = {
            uuid: this.UUID.id,
            prevUrl: fromState.url,
            currentUrl: toState.url
        };

        let tracker = this.getTracker();
            tracker = angular.extend({}, tracker, tmp);

        const MEMBER_ID = this.__getMemberId__();

        this.setTracker(tracker);

        this.__postAPI__(tracker).then(res => {
            this.__trace__(tracker);
        });

        this.__trace__(tracker);
    }

    action(params) {
        let tracker = this.getCopiedTracker(),
            isValid = false;

        if(angular.isNumber(params)) tracker.action = params;
        else {
            const keys = Object.keys(params);
            isValid = keys.every(v => this.__validator__(v));
            this.$log.debug(isValid);

            if(isValid) {
                keys.forEach(v => tracker[v] = params[v]);
            }
            else {
                this.$log.error('There are unavailable key in Tracker :: TrackerService');
                this.$log.error('Input params are => ', params);
                return false;
            }

            this.__postAPI__(tracker).then(res => {
                this.__trace__(tracker, 'custom');
            });

            this.__trace__(tracker, 'custom');
        }
    }

    setTracker(tracker) {
        this.__tracker__ = tracker;
    }

    getTracker() {
        return this.__tracker__;
    }

    getCopiedTracker() {
        return angular.copy(this.__tracker__);
    }




    /* @PRIVATE METHOD */
    __validator__(key) {
        const ALLOW_PARAMS = [
            'action',
            'currentUrl',
            'prevUrl',
            'uuid'
        ];

        return ALLOW_PARAMS.indexOf(key) > -1;
    }

    __getActionDesc__(action) {
        switch(action) {
            default: return '';
        }
    }

    __setUUID__(uuid) {
        let result = null;
        if(uuid && uuid.date === this.today) result = uuid;
        else {
            result = {
                id: this.UUIDService.generate('xxxxxxxxxx-xxxxxxxxxx-xxxxxxxxxx'),
                date: this.today
            };
            this.CookieService.put('TRACKER', result);
        }

        return result;
    }

    __getMemberId__() {
        const HEADER = this.Restangular.defaultHeaders[this.CUSTOM_HEADER_PREFIX + 'token'];
        let id = HEADER ? HEADER.substring(33) : null;

        return id;
    }

    __postAPI__(tracker) {
        return this.APIService.resource('tracker').post(tracker);
    }

    __trace__(tracker, isCustom) {
        this.$log.debug('=====================================[ TRACKER ]===============================');
        this.$log.debug(tracker);
        if(isCustom === 'custom') this.$log.debug('=================================================================[ ACTION : '+ tracker.action +' -> '+this.__getActionDesc__(tracker.action) +' ]');
        else this.$log.debug('====================================[ DEFAULT ACTION ]==============================');
    }
}
