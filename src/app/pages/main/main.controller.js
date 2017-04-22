
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
            width: 3,
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

        this.dummy = DummyService.get().contents;

        (this.init)();
    }

    init() {
        this.$timeout(() => {
            this.setViewmode(this.currentViewmode);
        });

        // this.getContents();
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

        this.angularGridInstance.gallery.refresh();
    }

    getViewmode() {
        let grid = this.CookieService.get('viewmode') || this.MAIN_GRID_INIT;

        return grid;
    }

    getContents() {
        this.APIService.resource('contents.list').get()
        .then(res => {
            console.log('======MAIN PAGE CONTENT CALLED => ', res, '======');
        });
    }
}
