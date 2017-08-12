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
        let isAuthenticated = this.$rootScope.authStatus.sign;
        let status = isAuthenticated && this.$rootScope.member.status;
        this.PermRoleStore
        .defineManyRoles({
            GHOST: (roleName, transitionProps) => {
                return !isAuthenticated;
            },
            USER: (roleName, transitionProps) => {
                return isAuthenticated;
            },
            INACTIVE_USER: (roleName, transitionProps) => {
                return isAuthenticated && status === 'inactive';
            },
            ACTIVE_USER: (roleName, transitionProps) => {
                return isAuthenticated && status === 'active';
            },
            STOP: (roleName, transitionProps) => {
                return isAuthenticated && status === 'stop';
            }
        });
    }
}
