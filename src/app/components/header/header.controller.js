export class HeaderController {
    constructor(
        $rootScope, $log,
        AuthenticationService
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$log = $log;
        this.AuthenticationService = AuthenticationService;

        this.isMobile = $rootScope.deviceInfo.isMobile;
        this.linkList = this.__getMenuList__(this.isMobile);
    }

    signout() {
        this.AuthenticationService.clear('reload');
    }

    /* @PRIVATE METHOD */
    __getMenuList__(isMobile) {
        let linkList = [];

        if(isMobile) {
            /*@MOBILE MENU*/
            linkList = [];
        }
        else {
            /*@DESKTOP MENU*/
            linkList = [{
                name: 'Submit Artwork',
                link: 'common.default.main'
            }];
        }

        return linkList;
    }
}
