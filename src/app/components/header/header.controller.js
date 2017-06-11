export class HeaderController {
    constructor(
        $rootScope, $log,
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
        this.memberProfile = this.isSignin && $rootScope.member.profileImg ?
            ImageService.setResolution($rootScope.member.profileImg, 320) :
            'https://s3-ap-northeast-1.amazonaws.com/pixelstairsdev/user/default_profile_image.png';

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
