

export function logConfig($logProvider, API_CONFIG) {
    'ngInject';

    let isDevAPI = API_CONFIG.host.indexOf('api.') > -1;
    /*
        @TODO
        * 2017.03.08 기준 dev, pro API 구분이 없으나
        * 추후 devapi.lubycon.com
        * API가 추가되면 위 변수 수정할 것
    */

    $logProvider.debugEnabled(isDevAPI);
}
