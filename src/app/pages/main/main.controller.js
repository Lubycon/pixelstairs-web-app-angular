
export class MainController {
    constructor (
        $log, DummyService, angularGridInstance
    ) {
        'ngInject';

        this.$log = $log;
        this.angularGridInstance = angularGridInstance;
        console.log(angularGridInstance);

        this.viewMode = [{
            name: 'Grid',
            icon: 'xi-apps',
            width: 3,
            selected: true
        },{
            name: 'Wide',
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

        this.dummy = DummyService.get('contents');
        this.columnWidth = this.getViewMode().width;

        this.scrollDisabled = true;

        (this.init)();
    }

    init() {

    }

    changeView(mode) {
        /* @LOG */ this.$log.debug('VIEW MODE CHANGE', mode);
        this.getViewMode().selected = false;
        mode.selected = true;
        this.columnWidth = this.getViewMode().width;
        this.angularGridInstance.gallery.refresh();
    }

    getViewMode() {
        return this.viewMode.filter(v => {
            return v.selected;
        })[0];
    }
}
