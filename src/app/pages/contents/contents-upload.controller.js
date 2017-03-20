export class ContentsUploadController {
    constructor($log) {
        'ngInject';

        this.$log = $log;

        this.contentData = {
            img: null,
            title: null,
            tags: [],
            desc: null
        };

        this.uploadedImg = null;
    }

    changedFile(files, file, newFiles, invalidFiles) {
        if(files.length < 1) return false;
        /*@LOG*/ this.$log.debug(this.uploadedImg);
        /*@LOG*/ this.$log.debug(files, file, newFiles, invalidFiles);
        this.contentData.img = this.uploadedImg;
    }
}
