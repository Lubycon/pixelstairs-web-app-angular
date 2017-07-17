export class ContentsUploadController {
    constructor(
        $rootScope, $log, $q, $state, $translate,
        APIService, ImageService, FormRegxService
    ) {
        'ngInject';

        this.$log = $log;
        this.$q = $q;
        this.$state = $state;
        this.$translate = $translate;

        this.APIService = APIService;
        this.ImageService = ImageService;
        this.FormRegxService = FormRegxService;

        this.lang = $rootScope.setting.language.split('-')[0];

        this.contentData = {
            image: {},
            title: null,
            hashTags: [],
            description: null
        };

        this.uploadedImg = null;
        this.isBusy = false;
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
        });
    }

    setTagError($tag) {
        this.form.tags.$setValidity('invalidTag', false);
        this.invalidTag = $tag.text;
    }

    setNewTag($tag, event) {
        this.form.tags.$setValidity('invalidTag', true);
        this.form.tags.$setPristine();
        this.invalidTag = null;

        if(this.contentData.hashTags.length > 20) {
            this.form.tags.$setValidity('maxTags', false);
            this.contentData.hashTags.pop();
        }
    }

    submit() {
        if(this.isBusy) return false;
        if(!this.contentData.image.file) {
            alert('Make sure your artwork!');
            return false;
        }

        this.isBusy = true;

        let contentId = null;

        this.postData()
        .then(res => {
            /* Content upload success */
            contentId = res.result.id;
            return this.postFile(contentId);
        }, err => {
            /* Content upload failed */
            this.isBusy = false;
            let msg = this.$translate.instant('ALERT_ERROR.CONTENTS_UPLOAD.FAILED');
            alert(msg);
        }).then(res => {
            /* File upload success */
            this.isBusy = false;
            this.$state.go('common.default.contents-success', { id: contentId });
            return false;
        }, err => {
            /* File upload failed */
            return this.cancelData(contentId);
        }).then(res => {
            if(res) {
                this.isBusy = false;
                let msg = this.$translate.instant('ALERT_ERROR.CONTENTS_UPLOAD.FAILED');
                alert(msg);
            }
        });
    }

    postData() {
        let defer = this.$q.defer();
        let data = angular.copy(this.contentData);
        /*
         * @TODO
         * license선택 기능이 추가되기 전까지는 기본 값
         * cc, by, nc, sa로 들어갈 것
         * 2017.06.17 -Evan
         */
        data.licenseCode = '1101';
        data.hashTags = data.hashTags.map(v => {
            return v.text;
        });
        delete data.image;
        /*@LOG*/ this.$log.debug('SUBMIT CONTENT => ', data);

        return this.APIService.resource('contents.upload').post(data);
    }

    postFile(contentId) {
        let defer = this.$q.defer();
        let data = {
            contentId,
            file: this.uploadedImg
        };
        let formData = new FormData();
        const KEYS = Object.keys(data);
        KEYS.forEach(v => {
            formData.append(v, data[v]);
        });

        return this.APIService.resource('contents.upload').postForm(formData);
    }

    cancelData(contentId) {
        return this.APIService.resource('contents.detail', {
            id: contentId
        }).delete();
    }
}
