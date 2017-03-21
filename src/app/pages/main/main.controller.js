
export class MainController {
    constructor (
        $log, $timeout,
        DummyService, CookieService,
        angularGridInstance
    ) {
        'ngInject';

        this.$log = $log;
        this.$timeout = $timeout;
        this.CookieService = CookieService;
        this.angularGridInstance = angularGridInstance;

        this.currentViewMode = this.getViewMode();

        this.viewMode = [{
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
            this.setViewMode(this.currentViewMode);
        });
    }

    setViewMode(mode) {
        /* @LOG */ this.$log.debug('SET VIEW MODE', mode);

        this.viewMode.forEach(v => {
            if(v.name === mode) {
                v.selected = true;
                this.columnWidth = v.width;
            }
            else v.selected = false;
        });

        this.currentViewMode = mode;
        this.CookieService.put('viewmode', this.currentViewMode);

        this.angularGridInstance.gallery.refresh();
    }

    getViewMode() {
        let grid = this.CookieService.get('viewmode') || 'grid';

        return grid;
    }
}
