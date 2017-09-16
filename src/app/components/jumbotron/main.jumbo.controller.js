export class MainJumboController {
    constructor(
        $rootScope, $state,
        ImageService, getImageRsv, $uibModal
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$state = $state;

        this.ImageService = ImageService;
        this.imageList = getImageRsv.result.contents;
        this.imageList.forEach(v => {
            v.image.file = ImageService.setResolution(v.image, 1920);
        });
        this.$uibModal = $uibModal;

        this.slickConfig = {
            autoplay: true,
            autoplaySpeed: 1500,
            speed: 800,
            dots: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="xi-angle-left-thin"></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="xi-angle-right-thin"></button>'
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

    gotoUpload () {
        if(this.$rootScope.authStatus.sign) {
            this.$state.go('common.default.contents-upload');
        }
        else {
            this.openSignupModal();
        }
    }

    openSignupModal () {
        let modal = this.$uibModal.open({
            windowClass: 'signup-modal-window',
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            templateUrl: 'app/components/modals/signup/signup.modal.tmpl.html',
            controller: 'SignupModalController',
            controllerAs: 'SignupModalCtrl',
            keyborad: true
        });
    }
}
