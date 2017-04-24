export class ContentsDetailController {
    constructor(
        $log, $stateParams,
        APIService, getContentRsv
    ) {
        'ngInject';

        this.$log = $log;
        this.$stateParams = $stateParams;
        this.APIService = APIService;

        this.data = getContentRsv.result;

        $log.debug('CONTENT DETAIL PAGE IS LOADED', this.data);

        this.init();
    }

    init() {
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
