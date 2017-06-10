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
        this.memberStatus = $rootScope.authStatus.sign ? $rootScope.member.status : null;

        this.linkList = this.__getMenuList__(this.isMobile);
        this.memberLinkList = this.__getMemberMenuList__(this.isMobile);
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
                link: 'common.default.contents-upload'
            }];
        }

        return linkList;
    }

    __getMemberMenuList__(isMobile) {
        let linkList = [];
        if(!this.$rootScope.authStatus) return linkList;

        if(isMobile) {
            /*@MOBILE MENU*/
            linkList = [];
        }
        else {
            /*@DESKTOP MENU*/
            linkList = [{
                name: 'Setting',
                link: 'common.default.member-setting({memberId:'+this.$rootScope.member.id+'})',
                ignore: 'inactive'
            },{
                name: 'Authentication',
                link: 'common.default.auth-signup',
                ignore: 'active'
            }];
        }

        return linkList;
    }
}
