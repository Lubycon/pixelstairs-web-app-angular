
export class ErrorPageController {
    constructor(
        $log, $state, $stateParams, $translate,
        $location, $window, APIService
    ) {
        'ngInject';

        this.$log = $log;
        this.$state = $state;
        this.$translate = $translate;
        this.$location = $location;
        this.$window = $window;

        this.APIService = APIService;

        this.httpStatus = $stateParams.httpStatus;
        this.errorMsg = $translate.instant(`HTTP.${this.httpStatus}`);

        (this.init)();
    }

    init() {
        this.getErrorMsg().then(res => {
            this.wiseword = {
                text: `"${res.result.message}"`,
                author: res.result.author
            };
        }, err => {
            this.wiseword = {
                text: '\"Mistakes are the portals of discovery.\"',
                author: 'James Joyce'
            };
        });
    }

    getErrorMsg() {
        return this.APIService.resource('quotes.mistake').get();
    }

    gotoBack() {
        const ref = document.referrer;
        if(ref.indexOf(this.$location.host()) > -1 && ref.indexOf(this.$location.path()) < 0) {
            this.$location.href = document.referrer;
        }
        else {
            this.$state.go('common.jumbo.main').then(res => {
                this.$window.reload();
            });
        }
    }
}
