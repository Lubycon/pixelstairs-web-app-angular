export class MainJumboController {
    constructor(

    ) {
        'ngInject';

        this.slickConfig = {
            autoplay: true,
            autoplaySpeed: 1000,
            speed: 800,
            dots: true,
            arrows: false
        };

        this.slides = [{
            id: 1,
            image: 'https://s-media-cache-ak0.pinimg.com/originals/38/60/71/3860710e884e9c48ccc1ddd43714ba0b.jpg'
        },{
            id: 2,
            image: 'http://www.lineage2.com/media/content-images/artwork/Infinite-Odyssey-Artwork-5.jpg'
        },{
            id: 3,
            image: 'http://orig15.deviantart.net/1283/f/2015/313/1/8/monody_artwork_by_jordangrimmer-d9fv2le.jpg'
        }];
    }
}
