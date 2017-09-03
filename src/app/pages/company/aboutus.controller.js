export class AboutusController {
    constructor(
        $log, $stateParams, $timeout
    ) {
        'ngInject';

        this.$log = $log;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;

        this.desciptions = [{
            title: 'Paint Art',
            alt: 'paint-art',
            icon: 'https://s3.ap-northeast-2.amazonaws.com/pixelstairs/assets/icons/icon_painter.svg'
        },{
            title: 'Computer<br>Graphic Art',
            alt: 'com-graphics',
            icon: 'https://s3-ap-northeast-1.amazonaws.com/pixelstairsdev/assets/icons/icon_com_graphics.svg'
        },{
            title: 'Photograph<br>Art',
            alt: 'photograph',
            icon: 'https://s3-ap-northeast-1.amazonaws.com/pixelstairsdev/assets/icons/icon_photograph.svg'
        }];

        this.ccDescription = [{
            alt: 'paper-work',
            icon: 'https://s3-ap-northeast-1.amazonaws.com/pixelstairsdev/assets/icons/icon_paper_work.svg'
        },{
            alt: 'cc',
            icon: 'https://s3-ap-northeast-1.amazonaws.com/pixelstairsdev/assets/icons/icon_cc.svg'
        }];

        this.sections = {
            intro: '.intro-section',
            cc: '.cc-section',
            contact: '.contact-section'
        };

        (this.init)();
    }

    init() {
        const SECTION = this.$stateParams.section;
        if(SECTION) this.__moveToSection__(SECTION);
    }

    /* PRIVATE METHOD */
    __moveToSection__(section) {
        const ELEMENT = angular.element(this.sections[section]);
        const SCROLL_POSITION = ELEMENT.offset().top;

        this.$timeout(() => {
            const TOP = section === 'intro' ? 0 : ELEMENT.offset().top;
            angular.element(document).scrollTop(TOP);
        },0);
    }
}
