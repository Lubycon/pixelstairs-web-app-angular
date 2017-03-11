
export class MainController {
    constructor ($log, DummyService) {
        'ngInject';

        this.$log = $log;

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
        /* @LOG */ this.$log.debug('test', mode);
        this.getViewMode().selected = false;
        mode.selected = true;
        this.columnWidth = this.getViewMode().width;
    }

    getViewMode() {
        return this.viewMode.filter(v => {
            return v.selected;
        })[0];
    }
}
