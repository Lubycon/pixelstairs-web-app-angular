export class FooterController {
    constructor(
        $log, $rootScope
    ) {
        'ngInject';

        this.$log = $log;

        this.lang = $rootScope.setting.language.split('-')[0];
        console.log(this.lang);
        this.linkList = [{
            name: 'about us',
            link: 'common.default.aboutus'
        },{
            name: 'contact',
            link: 'common.default.aboutus'
        },{
            name: 'privacy policy',
            link: `common.default.privacy-policy({ lang: '${this.lang}' })`
        },{
            name: 'terms of service',
            link: `common.default.terms({ lang: '${this.lang}' })`
        }];
    }
}
