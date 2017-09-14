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
        this.isBusyLike = false;

        this.data = getContentRsv.result;

        this.init();
    }

    init() {
        this.data.user.profileImg = angular.extend({}, this.data.user.profileImg, {
            file: this.ImageService.getUserProfile(this.data.user.profileImg)
        });
        this.data.image.thumbnail = this.ImageService.setResolution(this.data.image, '30');
        this.data.image.file = this.ImageService.setResolution(this.data.image, '1920');

        this.ccData = this.getCCModel(this.data.licenseCode);
    }

    getCCModel() {
        return this.CreativeCommonsService.getCCModel(this.data.licenseCode);
    }

    postLike() {
        const id = this.$stateParams.id;

        if(this.data.myLike) {
            // UI 부분
            this.data.myLike = false;
            this.data.counts.like--;

            // 실제 요청
            if(this.isBusyLike) return false;
            this.isBusyLike = true;

            this.APIService.resource('contents.like', { id }).delete()
            .finally(res => {
                this.isBusyLike = false;
            });
        }
        else {
            // UI 부분
            this.data.myLike = true;
            this.data.counts.like++;

            // 실제 요청
            if(this.isBusyLike) return false;
            this.isBusyLike = true;

            this.APIService.resource('contents.like', { id }).post()
            .finally(res => {
                this.isBusyLike = false;
            });
        }
    }

    getContent({ direction }) {
        const CURRENT_ID = this.$stateParams.id * 1;
        let nextId;

        if(direction === 'prev') {
            nextId = CURRENT_ID - 1;
        }
        else if(direction === 'next') {
            nextId = CURRENT_ID + 1;
        }
        else {
            return false;
        }

        this.APIService.resource('contents.detail', {
            id: nextId
        })
        .get().then(res => {
            console.log('nextId', res.result.id);
        }, err => {
            alert('There no more content!');
        });
    }
}
