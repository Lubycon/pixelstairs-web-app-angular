export class ContentsDetailController {
    constructor(
        $rootScope, $log, $stateParams,
        ImageService,
        getContentRsv
    ) {
        'ngInject';

        this.$log = $log;
        this.$stateParams = $stateParams;
        this.ImageService = ImageService;

        this.isMobile = $rootScope.deviceInfo.isMobile;
        this.data = getContentRsv.result;

        $log.debug('CONTENT DETAIL PAGE IS LOADED', this.data);

        this.init();
    }

    init() {
        this.data.user.profileImg = angular.extend({}, this.data.user.profileImg, {
            file: this.ImageService.getUserProfile(this.data.user.profileImg)
        });
        this.data.image.file = this.ImageService.setResolution(this.data.image, '1920');
        this.data.createdAt = new Date(this.data.createdAt);
        this.data.updatedAt = new Date(this.data.updatedAt);
        /*LOG*/this.$log.debug(this.data);
    }

    postLike() {
        const id = this.$stateParams.id;
        this.APIService.resource('contents.like', { id: id }).post().then(res => {
            /*@LOG*/this.$log.debug('LIKE => ',res);
        });
    }

    getDate(date){
        return new Date(date);
    }
}
