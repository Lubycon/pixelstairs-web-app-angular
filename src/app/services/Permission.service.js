/*
    @name: Permission.service.js
    @desc: Pixelstairs의 유저 퍼미션 정의 서비스
    @author: Evan Moon
    @created_at: 2017.08.12
*/

export class PermissionService {
    constructor(
        $rootScope, PermPermissionStore, PermRoleStore
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.PermPermissionStore = PermPermissionStore;
        this.PermRoleStore = PermRoleStore;
    }

    init() {
        this.setPermissions();
    }

    setPermissions() {
        this.setRoles();
    }

    setRoles() {
        this.PermRoleStore
        .defineManyRoles({
            ALL: (roleName, transitionProps) => {
                return true;
            },
            GHOST: (roleName, transitionProps) => {
                return !this.isAuthenticated();
            },
            USER: (roleName, transitionProps) => {
                return this.isAuthenticated();
            },
            INACTIVE_USER: (roleName, transitionProps) => {
                return this.isAuthenticated() && this.getUserStatus() === 'inactive';
            },
            ACTIVE_USER: (roleName, transitionProps) => {
                return this.isAuthenticated() && this.getUserStatus() === 'active';
            },
            STOP: (roleName, transitionProps) => {
                return this.isAuthenticated() && this.getUserStatus() === 'stop';
            }
        });
    }

    isAuthenticated() {
        return this.$rootScope.authStatus.sign;
    }

    getUserStatus() {
        return this.$rootSCope.authStatus.sign && this.$rootScope.member.status;
    }
}
