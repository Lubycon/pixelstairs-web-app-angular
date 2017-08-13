export class HeaderController {
    constructor(
        $rootScope, $scope, $log,
        USER_DEFAULT_PROFILE_IMG, USER_AGENT,
        AuthenticationService, ImageService
    ) {
        'ngInject';

        this.USER_AGENT = USER_AGENT;

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

        $(document).scroll(() => {
            this.showSigninBanner();
        });
    }

    signout(self) {
        if(self) {
            self.AuthenticationService.clear('reload');
        }
        else {
            this.AuthenticationService.clear('reload');
        }
    }

    /*
     * @TODO 인스타그램 인앱에서 헤더가 잘리는 이슈 때문에 로그인이 불가능해서 임시로 만든 배너
     * 나중에 삭제할 것
     * 2017.08.14 - Evan
     */
    showSigninBanner() {
        let banner = angular.element('.mobile-signin-banner');
        const isShowing = banner.css('bottom') === '15px';
        const isInstagramInApp = this.USER_AGENT.browser.indexOf('instagram') > -1;
        const isAuthenticated = this.$rootScope.authStatus.sign;

        if(!isInstagramInApp || isAuthenticated && false) {
            return false;
        }

        if(!isShowing && angular.element(document).scrollTop() > 100) {
            banner.css('bottom', '15px');
        }
        else if(isShowing && angular.element(document).scrollTop() === 0) {
            banner.css('bottom', '-500px');
        }
        else {
            return false;
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
