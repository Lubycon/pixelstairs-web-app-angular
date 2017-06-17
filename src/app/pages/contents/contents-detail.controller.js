export class ContentsDetailController {
    constructor(
        $rootScope, $log, $stateParams,
        ImageService, CreativeCommonsService,
        getContentRsv
    ) {
        'ngInject';

        this.$log = $log;
        this.$stateParams = $stateParams;
        this.ImageService = ImageService;
        this.CreativeCommonsService = CreativeCommonsService;

        this.isMobile = $rootScope.deviceInfo.isMobile;
        this.data = getContentRsv.result;

        this.init();
    }

    init() {
        this.data.user.profileImg = angular.extend({}, this.data.user.profileImg, {
            file: this.ImageService.getUserProfile(this.data.user.profileImg)
        });
        this.data.image.file = this.ImageService.setResolution(this.data.image, '1920');
        this.data.createdAt = new Date(this.data.createdAt);
        this.data.updatedAt = new Date(this.data.updatedAt);

        this.ccData = this.getCCModel(this.data.licenseCode);
    }

    getCCModel() {
        return this.CreativeCommonsService.getCCModel(this.data.licenseCode);
    }

    postLike() {
        const id = this.$stateParams.id;
        this.APIService.resource('contents.like', { id: id }).post().then(res => {
            /*@LOG*/this.$log.debug('LIKE => ',res);
        });
    }
}
