export class HeaderController {
    constructor(
        $rootScope, $log,
        USER_DEFAULT_PROFILE_IMG,
        AuthenticationService, ImageService
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$log = $log;
        this.AuthenticationService = AuthenticationService;
        this.ImageService = ImageService;

        this.isMobile = $rootScope.deviceInfo.isMobile;
        this.isSignin = $rootScope.authStatus && $rootScope.authStatus.sign;

        this.memberStatus = this.isSignin ? $rootScope.member.status : null;
        console.log(this.memberStatus);
        this.memberProfile = this.isSignin && ImageService.getUserProfile($rootScope.member.profileImg);

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
                link: 'common.default.contents-upload',
                signin: true
            }];
        }

        return linkList;
    }

    __getMemberMenuList__(isMobile) {
        let linkList = [];
        if(!this.isSignin) return linkList;

        linkList = [{
            name: 'Setting',
            link: 'common.default.member-setting({memberId:'+this.$rootScope.member.id+'})',
            icon: 'xi-cog',
            ignore: 'inactive'
        },{
            name: 'Authentication',
            link: 'common.default.auth-signup',
            icon: 'xi-key',
            ignore: 'active'
        }];

        return linkList;
    }
}
