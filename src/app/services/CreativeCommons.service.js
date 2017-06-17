/*
    CC코드는 총 4개의 바이너리 필드로 이루어져있다.
    각 필드는 다음을 의미한다.
    0 -> BY사용여부
    0 -> NC사용여부
    0 -> ND 사용여부
    0 -> SA 사용여부
    이 4개의 필드가 모두 0이라면 CC를 사용하지 않는다는 걸 의미한다.
*/
export class CreativeCommonsService {
    constructor(
        $rootScope, $translate
    ) {
        'ngInject';

        const CC_PREFIX = 'xi-cc-';

        this.$rootScope = $rootScope;

        this.ICONS = {
            cc: `${CC_PREFIX}cc`,
            by: `${CC_PREFIX}by`,
            sa: `${CC_PREFIX}sa`,
            nd: `${CC_PREFIX}nd`,
            nc: `${CC_PREFIX}nc`,
            zero: `${CC_PREFIX}zero`
        };

        this.DESCS = {
            cc: $translate.instant(`LICENSE.DESCRIPTION.CC`),
            by: $translate.instant(`LICENSE.DESCRIPTION.BY`),
            sa: $translate.instant(`LICENSE.DESCRIPTION.SA`),
            nd: $translate.instant(`LICENSE.DESCRIPTION.ND`),
            nc: $translate.instant(`LICENSE.DESCRIPTION.NC`),
            zero: $translate.instant(`LICENSE.DESCRIPTION.CC0`)
        };

        this.CC_CODE = {
            '1000': ['cc', 'by'],
            '1100': ['cc', 'by', 'nc'],
            '1110': ['cc', 'by', 'nc', 'nd'],
            '1010': ['cc', 'by', 'nd'],
            '1001': ['cc', 'by', 'sa'],
            '1101': ['cc', 'by', 'nc', 'sa'],
            '0000': ['zero']
        };
    }

    getCCModel(code) {
        const CC_MODEL = {
            code: null,
            icon: null,
            desc: null
        };
        const CC_ARRAY = this.CC_CODE[code];
        const CC_LANDING = this.__getCCURI__(code);
        console.log(CC_LANDING);

        if(!CC_ARRAY) {
            return false;
        }
        else {
            let output = {};

            output.model = CC_ARRAY.map(v => {
                let model = angular.extend({}, {}, CC_MODEL);
                model.code = v;
                model.icon = this.ICONS[v];
                model.desc = this.DESCS[v];

                return model;
            });
            output.url = CC_LANDING;

            return output;
        }
    }

    __getCCURI__(code) {
        const LANG = this.$rootScope.setting.language.split('-')[0];

        let ccArray = this.CC_CODE[code];
        if(!ccArray) return false;

        ccArray = ccArray.filter(v => v !== 'cc');

        let ccLinkProp = ccArray.join('-');

        return `https://creativecommons.org/licenses/${ccLinkProp}/4.0/deed.${LANG}`;
    }
}
