export class ContentsUploadController {
    constructor(
        $log, $q, APIService, ImageService
    ) {
        'ngInject';

        this.$log = $log;
        this.$q = $q;
        this.APIService = APIService;
        this.ImageService = ImageService;

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

        this.$q.all([
            this.ImageService.isTransparency(this.uploadedImg),
            this.ImageService.convertToBase64(this.uploadedImg)
        ])
        .then(res => {
            if(res[0]) {
                this.uploadedImg = null;
                alert('You can not upload transparency image');
                return false;
            }
            this.contentData.image.file = res[1];

            /*@LOG*/ this.$log.debug('model => ', this.uploadedImg);
            /*@LOG*/ this.$log.debug('files => ', files, file, newFiles, invalidFiles);
            /*@LOG*/ this.$log.debug('final => ', this.contentData.image.file);
        });
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
