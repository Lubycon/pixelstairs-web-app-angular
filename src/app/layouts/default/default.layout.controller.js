export class DefaultLayoutController {
    constructor($rootScope) {
        'ngInject';

        this.name = 'default-layout';
        this.header = true;
        this.aside = false;
        this.footer = true;
        this.isMobile = $rootScope.deviceInfo.isMobile;
    }
}
