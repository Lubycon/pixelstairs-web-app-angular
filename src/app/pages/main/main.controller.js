
export class MainController {
    constructor (
        $rootScope, $scope, $log, $timeout, $location,
        APIService, CookieService, SearchService,
        MAIN_GRID_INIT
    ) {
        'ngInject';

        this.$scope = $scope;
        this.$log = $log;
        this.$timeout = $timeout;
        this.$location = $location;

        this.APIService = APIService;
        this.CookieService = CookieService;
        this.SearchService = SearchService;

        this.isMobile = $rootScope.deviceInfo.isMobile;

        this.MAIN_GRID_INIT = MAIN_GRID_INIT;
        this.currentViewmode = this.isMobile ? 'wide' : this.getViewmodeName();

        this.viewmode = [{
            name: 'grid',
            icon: 'xi-border-all',
            width: 6,
            selected: true
        },{
            name: 'wide',
            icon: 'xi-layout-full-o',
            width: 12,
            selected: false
        }];

        this.viewmodeKey = this.viewmode.reduce((a, b) => {
            a[b.name] = b;
            return a;
        }, {});

        this.sortFilter = [{
            name: 'Featured',
            value: 'featured'
        },{
            name: 'Latest',
            value: 'latest'
        }];

        this.pageIndex = 0;
        this.sortMode = 'featured';

        this.scrollDisabled = true;
        this.busyInterval = 1000;
        this.contentsData = this.__initList__();

        this.gridWidth = this.__getGridWidth__();

        (this.init)();
    }

    init() {
        this.$timeout(() => {
            this.setViewmode(this.currentViewmode);
            this.setFilter(this.mode);
        });

        this.getContents();
    }

    setViewmode(mode) {
        /* @LOG */ this.$log.debug('SET VIEW MODE => ', mode);

        this.viewmode.forEach(v => {
            if(v.name === mode) {
                v.selected = true;
                this.columnWidth = v.width;
            }
            else v.selected = false;
        });

        this.currentViewmode = mode;
        this.gridWidth = this.__getGridWidth__();
        this.CookieService.put('viewmode', this.currentViewmode);
    }

    setFilter(mode) {
        this.$log.debug('SET FILTER TO => ', mode);
        this.sortMode = mode;
        this.contentsData = this.__initList__();
        this.getContents();
    }

    getViewmodeName() {
        let mode = this.CookieService.get('viewmode') || this.MAIN_GRID_INIT;

        return mode;
    }

    getCurrentViewmode() {
        return this.viewmodeKey[this.currentViewmode];
    }

    onScroll() {
        this.scrollDisabled = true;
        if(this.contentsData.list.length >= this.contentsData.totalCount) return false;
        this.getContents();
    }

    getContents() {
        this.APIService.resource('contents.list').get({
            pageIndex: this.pageIndex,
            sort: this.sortMode
        })
        .then(res => {
            if(res.result && res.result.contents) {
                this.__addContentToList__(res.result);
            }
        });
    }

    __getGridWidth__() {
        let gridWidth = this.getCurrentViewmode().width,
            documentWidth = angular.element('.page-body').width();

        return documentWidth / (12 / gridWidth) - 100;
    }

    __addContentToList__(data) {
        this.contentsData.list = $.merge(this.contentsData.list, data.contents);
        this.contentsData.totalCount = data.totalCount;

        this.pageIndex++;

        this.$timeout(() => {
            this.scrollDisabled = false;
        }, this.busyInterval);
    }

    __initList__() {
        return {
            list: [],
            totalCount: 0
        };
    }
}
