export class ContentsUploadController {
    constructor(
        $rootScope, $log, $q, $state,
        APIService, ImageService, FormRegxService
    ) {
        'ngInject';

        this.$log = $log;
        this.$q = $q;
        this.$state = $state;

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

    postData() {
        if(this.isBusy) return false;

        this.isBusy = true;
        let data = angular.copy(this.contentData);

        if(!this.contentData.image.file) {
            alert('Make sure your artwork!');
            return false;
        }

        /* SET TAGS */
        data.hashTags = data.hashTags.map(v => {
            return v.text;
        });

        /*
            license선택 기능이 추가되기 전까지는 기본 값
            cc, by, nc, sa로 들어갈 것
            2017.06.17 -Evan
        */
        data.licenseCode = '1101';

        /*@LOG*/ this.$log.debug('SUBMIT CONTENT => ', data);

        this.APIService.resource('contents.upload').post(data, { 'Content-Type': 'multipart/mixed' })
        .then(res => {
            console.log(res.result.id);
            this.isBusy = false;
            this.$state.go('common.default.contents-success', { id: res.result.id });
        }, err => {
            alert('Somthing is wrong!');
            this.isBusy = false;
        });
    }
}
