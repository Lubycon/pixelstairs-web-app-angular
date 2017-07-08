export class HeaderController {
    constructor(
        $rootScope, $scope, $log,
        USER_DEFAULT_PROFILE_IMG,
        AuthenticationService, ImageService
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$log = $log;
        this.AuthenticationService = AuthenticationService;
        this.ImageService = ImageService;

        this.isMobile = $rootScope.deviceInfo.isMobile;

        this.$scope.$on('update-member-data', () => {
            (this.init)();
        });

        (this.init)();
    }

    init() {
        this.__setMemberData__();
        this.linkList = this.__getMenuList__(this.isMobile);
        this.memberLinkList = this.__getMemberMenuList__(this.isMobile);
    }

    signout() {
        this.AuthenticationService.clear('reload');
    }

    /* @PRIVATE METHOD */
    __setMemberData__() {
        this.isSignin = this.$rootScope.authStatus &&
            this.$rootScope.authStatus.sign &&
            !!this.$rootScope.member;

        this.memberStatus = this.isSignin &&
            this.$rootScope.member.status;

        this.memberProfile = this.isSignin &&
            this.ImageService.getUserProfile(this.$rootScope.member.profileImg);
    }

    __getMenuList__(isMobile) {
        let linkList = [];

        if(isMobile) {
            /*@MOBILE MENU*/
            linkList = [];
        }
        else {
            /*@DESKTOP MENU*/
            linkList = [{
                name: 'HEADER.UPLOAD_ARTWORK',
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
            name: 'MENU.ACCOUNT_SETTING',
            link: 'common.default.member-setting({memberId:'+this.$rootScope.member.id+'})',
            icon: 'xi-cog',
            ignore: 'inactive'
        },{
            name: 'MENU.AUTHENTICATION',
            link: 'common.default.auth-signup',
            icon: 'xi-key',
            ignore: 'active'
        }];

        return linkList;
    }
}
