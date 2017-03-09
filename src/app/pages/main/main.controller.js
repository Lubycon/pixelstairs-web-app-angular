
export class MainController {
    constructor ($log) {
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
    }

    changeView(mode) {
        /* @LOG */ this.$log.debug('test', mode);

    }
}
