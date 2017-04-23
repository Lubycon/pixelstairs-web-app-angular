export class ContentsUploadController {
    constructor(
        $log, APIService
    ) {
        'ngInject';

        this.$log = $log;
        this.APIService = APIService;

        this.contentData = {
            image: {},
            title: null,
            hashTags: [],
            description: null
        };

        this.uploadedImg = null;
    }

    changedFile(files, file, newFiles, invalidFiles) {
        if(files.length < 1) return false;
        /*@LOG*/ this.$log.debug(this.uploadedImg);
        /*@LOG*/ this.$log.debug(files, file, newFiles, invalidFiles);

        this.contentData.image.file = this.uploadedImg;
    }

    postData() {
        let data = angular.copy(this.contentData);
        // TEST
        data.licenseCode = '0100';

        /*@LOG*/ this.$log.debug('SUBMIT CONTENT => ', data);

        this.APIService.resource('contents.upload').post(data).then(res => {
            /*@LOG*/this.$log.debug(res);
        });
    }
}
