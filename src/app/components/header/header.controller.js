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
        this.memberLinkList = this.__getMemberMenuList__(this.isMobile);
    }

    signout(self) {
        if(self) {
            self.AuthenticationService.clear('reload');
        }
        else {
            this.AuthenticationService.clear('reload');
        }
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

    __getMemberMenuList__(isMobile) {
        let linkList = [];
        if(!this.isSignin) return linkList;

        linkList = [{
            name: 'MENU.ACCOUNT_SETTING',
            link: 'common.default.member-setting({memberId:'+this.$rootScope.member.id+'})',
            icon: 'xi-cog',
            permission: 'ACTIVE_USER'
        },{
            name: 'MENU.CHANGE_PASSWORD',
            link: 'common.default.cert-password',
            icon: 'xi-key',
            permission: 'USER'
        },{
            name: 'MENU.AUTHENTICATION',
            link: 'common.default.auth-signup',
            icon: 'xi-key',
            permission: 'INACTIVE_USER'
        },{
            name: 'LABEL.SIGNOUT',
            icon: 'xi-power-off',
            callback: this.signout,
            permission: 'ALL'
        }];

        return linkList;
    }
}
