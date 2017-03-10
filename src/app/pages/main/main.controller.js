
export class MainController {
    constructor ($log, DummyService) {
        'ngInject';

        this.$log = $log;

        this.viewMode = [{
            name: 'Wide',
            icon: 'xi-layout-full'
        },{
            name: 'Grid',
            icon: 'xi-apps'
        }];

        this.sortFilter = [{
            name: 'MONTHLY HOT',
            value: 'hot'
        },{
            name: 'LATEST',
            value: 'latest'
        }];

        this.dummy = DummyService.get('contents');

        this.scrollDisabled = true;

        (this.init)();
    }

    init() {
        console.log('INIT');
    }

    changeView(mode) {
        /* @LOG */ this.$log.debug('test', mode);

    }
}
