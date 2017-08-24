
export class MainController {
    constructor (
        $rootScope, $scope, $log, $timeout, $location,
        APIService, CookieService, SearchService, angularGridInstance,
        MAIN_GRID_INIT, CONTENTS_VIEW_MODE, CONTENTS_SORT_FILTER
    ) {
        'ngInject';

        this.$scope = $scope;
        this.$log = $log;
        this.$timeout = $timeout;
        this.$location = $location;

        this.APIService = APIService;
        this.CookieService = CookieService;
        this.SearchService = SearchService;

        this.angularGridInstance = angularGridInstance;

        this.isMobile = $rootScope.deviceInfo.isMobile;

        this.MAIN_GRID_INIT = MAIN_GRID_INIT;
        this.viewmode = CONTENTS_VIEW_MODE;
        this.sortFilter = CONTENTS_SORT_FILTER;

        this.pageIndex = 1;
        this.sortMode = this.sortFilter[1].value;

        this.isInitBusy = false;
        this.isBusy = false;

        this.busyInterval = 2000;
        this.contentsData = this.__initList__();

        (this.init)();
    }

    init() {
        this.getContents();
    }

    setFilter(mode) {
        if(this.isBusy) return false;

        /* @LOG */ this.$log.debug('SET FILTER TO => ', mode);

        this.sortMode = mode;
        this.contentsData = this.__initList__();
        this.pageIndex = 1;
        this.isInitBusy = true;

        this.getContents();
    }

    onScroll() {
        if(this.contentsData.list.length >= this.contentsData.totalCount) return false;
        this.getContents();
    }

    getContents() {
        if(this.isBusy) return false;

        this.isBusy = true;
        this.APIService.resource('contents.list').get({
            pageIndex: this.pageIndex,
            pageSize: 21,
            sort: this.sortMode
        })
        .then(res => {
            if(res.result && res.result.contents) {
                this.__addContentToList__(res.result);
            }
        });
    }

    __addContentToList__(data) {
        this.contentsData.list = $.merge(this.contentsData.list, data.contents);
        this.contentsData.totalCount = data.totalCount;

        this.pageIndex++;

        this.$timeout(() => {
            this.isBusy = false;
            this.isInitBusy = false;
        }, this.busyInterval);
    }

    __initList__() {
        this.pageIndex = 1;
        return {
            list: [],
            totalCount: 0
        };
    }
}
