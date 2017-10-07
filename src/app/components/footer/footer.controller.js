export class FooterController {
    constructor(
        $log, $rootScope
    ) {
        'ngInject';

        this.$log = $log;

        this.lang = $rootScope.setting.language.split('-')[0];
        this.linkList = [{
            name: 'FOOTER.ABOUT_US',
            link: 'common.jumbo.aboutus({ section: "intro" })'
        },{
            name: 'FOOTER.CONTACT',
            link: 'common.jumbo.aboutus({ section: "contact" })'
        },{
            name: 'FOOTER.PRIVACY_POLICY',
            link: `common.default.privacy-policy({ lang: '${this.lang}' })`
        },{
            name: 'FOOTER.TERMS_OF_SERVICE',
            link: `common.default.terms({ lang: '${this.lang}' })`
        }];
    }
}
