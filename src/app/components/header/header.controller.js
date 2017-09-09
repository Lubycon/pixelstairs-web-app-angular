export class HeaderController {
    constructor(
        $rootScope, $scope, $log, $state,
        USER_DEFAULT_PROFILE_IMG, USER_AGENT,
        AuthenticationService, ImageService
    ) {
        'ngInject';

        this.USER_AGENT = USER_AGENT;

        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$log = $log;
        this.$state = $state;
        this.AuthenticationService = AuthenticationService;
        this.ImageService = ImageService;
        this.isTransparency = this.hasJumbotron();

        this.isMobile = $rootScope.deviceInfo.isMobile;

        this.$scope.$on('update-member-data', () => {
            (this.init)();
        });

        this.$scope.$on('state-changed', () => {
            (this.init)();
        });

        (this.init)();
    }

    init() {
        this.__setMemberData__();
        this.memberLinkList = this.__getMemberMenuList__(this.isMobile);

        if(this.hasJumbotron()) {
            angular.element(document).scroll(() => {
                if(!this.hasJumbotron()) return false;
                
                const $JUMBO = angular.element(document).find('.jumbotron');
                const $HEADER = angular.element(document).find('.global-header');
                let scrollTop = angular.element(document).scrollTop();
                let threshold = $JUMBO.offset().top + $JUMBO.height() - $HEADER.height();
                this.calcTransparentHeader(scrollTop, threshold);
            });
        }
    }

    signout(self) {
        if(self) {
            self.AuthenticationService.clear('reload');
        }
        else {
            this.AuthenticationService.clear('reload');
        }
    }

    calcTransparentHeader(scrollTop, t) {
        const $HEADER = angular.element('.global-header');
        let isTransparency = $HEADER.hasClass('transparency');
        if(scrollTop < t) {
            if(!isTransparency) {
                this.isTransparency = true;
                $HEADER.addClass('transparency');
            }
        }
        else {
            if(isTransparency) {
                this.isTransparency = false;
                $HEADER.removeClass('transparency');
            }
        }

        this.isTransparency = isTransparency;
        this.$scope.$apply();
    }

    hasJumbotron() {
        return this.$state.current.name.indexOf('common.jumbo') > -1;
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
