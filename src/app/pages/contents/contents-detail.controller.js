export class ContentsDetailController {
    constructor(
        $log, $stateParams,
        ImageService,
        getContentRsv
    ) {
        'ngInject';

        this.$log = $log;
        this.$stateParams = $stateParams;
        this.ImageService = ImageService;

        this.data = getContentRsv.result;

        $log.debug('CONTENT DETAIL PAGE IS LOADED', this.data);

        this.init();
    }

    init() {
        this.data.image.file = this.ImageService.setResolution(this.data.image, '1920');
        this.data.createdAt = this.getDate(this.data.createdAt);
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
