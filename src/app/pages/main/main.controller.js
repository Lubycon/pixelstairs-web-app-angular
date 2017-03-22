
export class MainController {
    constructor (
        $log, $timeout, $uibPosition,
        DummyService, CookieService,
        angularGridInstance,
        MAIN_GRID_INIT
    ) {
        'ngInject';

        this.$log = $log;
        this.$timeout = $timeout;
        this.$uibPosition = $uibPosition;
        this.CookieService = CookieService;
        this.angularGridInstance = angularGridInstance;

        this.MAIN_GRID_INIT = MAIN_GRID_INIT;

        this.currentViewmode = this.getViewmode();

        this.viewmode = [{
            name: 'grid',
            icon: 'xi-apps',
            width: 3,
            selected: false
        },{
            name: 'wide',
            icon: 'xi-layout-full',
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

        this.dummy = DummyService.get().contents;
        this.scrollDisabled = true;

        (this.init)();
    }

    init() {
        this.$timeout(() => {
            this.setViewmode(this.currentViewmode);
        });


    }

    setViewmode(mode) {
        /* @LOG */ this.$log.debug('SET VIEW MODE', mode);

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
}
