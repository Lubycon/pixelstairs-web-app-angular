export class AboutusController {
    constructor(
        $log
    ) {
        'ngInject';

        this.$log = $log;

        this.desciptions = [{
            title: 'Paint Art',
            alt: 'paint-art',
            icon: 'https://s3-ap-northeast-1.amazonaws.com/pixelstairsdev/assets/icons/icon_painter.svg'
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
    }
}
