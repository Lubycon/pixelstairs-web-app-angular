export class ContentsUploadController {
    constructor(
        $log, APIService, Base64Service
    ) {
        'ngInject';

        this.$log = $log;
        this.APIService = APIService;
        this.Base64Service = Base64Service;

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
        this.Base64Service.convertToBase64FromImage(this.uploadedImg).then(res => {
            this.contentData.image.file = res;
        });

        /*@LOG*/ this.$log.debug('model => ', this.uploadedImg);
        /*@LOG*/ this.$log.debug('files => ', files, file, newFiles, invalidFiles);
        /*@LOG*/ this.$log.debug('final => ', this.contentData.image.file);
    }

    postData() {
        let data = angular.copy(this.contentData);

        /* SET TAGS */
        data.hashTags = data.hashTags.map(v => {
            return v.text;
        });

        /*TEST*/
        data.licenseCode = '0100';

        /*@LOG*/ this.$log.debug('SUBMIT CONTENT => ', data);

        this.APIService.resource('contents.upload').post(data, { 'Content-Type': 'multipart/mixed' }).then(res => {
            alert('UPLOAD FINISHED: DEBUG');
            /*@LOG*/this.$log.debug(res);
        });
    }
}
