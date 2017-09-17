
export function routerConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.member-setting', {
            url: '/member/setting/:memberId',
            templateUrl: 'app/pages/member/member-setting.tmpl.html',
            controller: 'MemberSettingController',
            controllerAs: 'SettingCtrl',
            params: {
                memberId: null
            },
            resolve: {
                getMemberRsv: ($stateParams, APIService) => {
                    return APIService.resource('users.info', { id: $stateParams.memberId }).get().then();
                }
            },
            data: {
                permissions: {
                    except: ['GHOST', 'INACTIVE_USER'],
                    redirectTo: {
                        GHOST: 'full.default.signin',
                        INACTIVE_USER: 'common.default.auth-signup'
                    }
                }
            }
        })
        ;
}
