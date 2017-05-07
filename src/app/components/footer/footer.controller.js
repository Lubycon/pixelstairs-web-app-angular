export class FooterController {
    constructor(
        $log
    ) {
        'ngInject';

        this.$log = $log;

        this.linkList = [{
            name: 'about us',
            link: 'common.default.main'
        },{
            name: 'contact',
            link: 'common.default.main'
        },{
            name: 'privacy policy',
            link: 'common.default.privacy-policy'
        },{
            name: 'terms of service',
            link: 'common.default.terms'
        }];
    }
}
