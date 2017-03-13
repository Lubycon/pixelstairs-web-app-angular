export function authenticationDetect(
    $rootScope, $state, CookieService, $log,
    APIService, $translate, AuthenticationService,
    AppSettingService, Restangular, CUSTOM_HEADER_PREFIX
) {
    'ngInject';

    let defaultHeaders = Restangular.defaultHeaders,
        authData = CookieService.getDecrypt('auth'),
        memberState = CookieService.getDecrypt('memberState');

    const isSigned = authData && memberState.sign;

    if(isSigned) {
        defaultHeaders[CUSTOM_HEADER_PREFIX + 'token'] = authData;
        Restangular.setDefaultHeaders(defaultHeaders);
        $rootScope.memberState = memberState;

        APIService.resource('members.simple').get()
        .then(res => {
            if(res && res.status.code === '0000') {
                $rootScope.member = res.result;
                CookieService.put('member', $rootScope.member);
                if($rootScope.member.country) AppSettingService.set('country', $rootScope.member.country.alpha2Code);
            }
            else {
                AuthenticationService.clear('reload');
            }
        }, err => {
            AuthenticationService.clear('reload');
        });
    }
}
