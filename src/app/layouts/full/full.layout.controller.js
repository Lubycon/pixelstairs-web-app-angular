export class FullLayoutController {
    constructor($rootScope) {
        'ngInject';

        this.header = false;
        this.aside = false;
        this.footer = false;
        this.isMobile = $rootScope.deviceInfo.isMobile;
    }
}
