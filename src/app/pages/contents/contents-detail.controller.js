export class ContentsDetailController {
    constructor(
        $rootScope, $log, $stateParams,
        APIService, ImageService, CreativeCommonsService,
        getContentRsv
    ) {
        'ngInject';

        this.$log = $log;
        this.$stateParams = $stateParams;

        this.APIService = APIService;
        this.ImageService = ImageService;
        this.CreativeCommonsService = CreativeCommonsService;

        this.isSigned = $rootScope.authStatus.sign;
        this.isMobile = $rootScope.deviceInfo.isMobile;
        this.lang = $rootScope.setting.language.split('-')[0];

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

        if(this.data.myLike) {
            this.APIService.resource('contents.like', { id }).delete().then(res => {
                this.data.myLike = false;
                this.data.counts.like--;
            });
        }
        else {
            this.APIService.resource('contents.like', { id }).post().then(res => {
                this.data.myLike = true;
                this.data.counts.like++;
            });
        }
    }
}
