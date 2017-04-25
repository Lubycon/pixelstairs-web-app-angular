
export class MainController {
    constructor (
        $scope, $log, $timeout, $uibPosition,
        APIService, CookieService,
        angularGridInstance,
        DummyService,
        MAIN_GRID_INIT
    ) {
        'ngInject';

        this.$scope = $scope;
        this.$log = $log;
        this.$timeout = $timeout;
        this.$uibPosition = $uibPosition;

        this.APIService = APIService;
        this.CookieService = CookieService;
        this.angularGridInstance = angularGridInstance;

        this.MAIN_GRID_INIT = MAIN_GRID_INIT;
        this.currentViewmode = this.getViewmode();
        this.selectedModel = {};

        this.viewmode = [{
            name: 'grid',
            icon: 'xi-border-all',
            width: 6,
            selected: false
        },{
            name: 'wide',
            icon: 'xi-layout-full-o',
            width: 12,
            selected: false
        }];

        this.sortFilter = [{
            name: 'Featured',
            value: 'hot'
        },{
            name: 'Latest',
            value: 'latest'
        }];

        this.scrollDisabled = true;
        this.busyInterval = 1000;
        this.contentsData = {
            list: [],
            totalCount: 0
        };

        (this.init)();
    }

    init() {
        this.$timeout(() => {
            this.setViewmode(this.currentViewmode);
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
        this.CookieService.put('viewmode', this.currentViewmode);

        this.$timeout(() => {
            this.angularGridInstance.gallery.refresh();
        });
    }

    getViewmode() {
        let grid = this.CookieService.get('viewmode') || this.MAIN_GRID_INIT;

        return grid;
    }

    onScroll() {
        this.scrollDisabled = true;
        if(this.contentsData.list.length >= this.contentsData.totalCount) return false;
        this.getContents();
    }

    getContents() {
        this.APIService.resource('contents.list').get()
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
            this.scrollDisabled = false;
        }, this.busyInterval);
    }
}
