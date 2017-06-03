export class FooterController {
    constructor(
        $log
    ) {
        'ngInject';

        this.$log = $log;

        this.linkList = [{
            name: 'about us',
            link: 'common.default.aboutus'
        },{
            name: 'contact',
            link: 'common.default.aboutus'
        },{
            name: 'privacy policy',
            link: 'common.default.privacy-policy'
        },{
            name: 'terms of service',
            link: 'common.default.terms'
        }];
    }
}
