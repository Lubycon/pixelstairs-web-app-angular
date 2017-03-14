
export function routerConfig ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('common.default.member-setting', {
            url: '/member/setting/:memberId',
            templateUrl: 'app/pages/member/member-setting.tmpl.html',
            controller: 'MemberSettingController',
            controllerAs: 'SettingCtrl',
            authenticate: 'member',
            params: {
                memberId: null
            },
            resolve: {
                getMemberRsv: ($stateParams, APIService) => {
                    return APIService.resource('members.detail', { id: $stateParams.memberId }).get().then();
                }
            }
        })
        ;
}
