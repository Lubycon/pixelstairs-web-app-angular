export class DefaultLayoutController {
    constructor($rootScope) {
        'ngInject';

        this.header = true;
        this.aside = false;
        this.footer = true;
        this.isMobile = $rootScope.deviceInfo.isMobile;
    }
}
