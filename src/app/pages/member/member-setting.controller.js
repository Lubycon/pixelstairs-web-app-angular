export class MemberSettingController {
    constructor(
        $rootScope, $log, $uibModal,
        APIService, getMemberRsv
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$log = $log;
        this.$uibModal = $uibModal;
        this.APIService = APIService;

        this.memberData = getMemberRsv.result.userData;
        this.memberData.profile = this.memberData.profile || {file: 'https://s3-ap-northeast-1.amazonaws.com/lubycon/assets/defaults/user.png'};

        this.genders = [{
            name: 'Male',
            code: 'M'
        },{
            name: 'Female',
            code: 'F'
        },{
            name: 'etc',
            code: 'E'
        }];

        this.uploadedProfile = null;
    }

    changedFile(files, file, newFiles, invalidFiles) {
        if(files.length < 1) return false;
        /*@LOG*/ this.$log.debug(files, file, newFiles, invalidFiles);
        this.openCropModal();
    }

    openCropModal() {
        let modal = this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: true,
            templateUrl: 'app/components/modals/cropper/cropper.modal.tmpl.html',
            controller: 'CropperModalController',
            controllerAs: 'CropperCtrl',
            resolve: {
                data: () => {
                    return {
                        img: this.uploadedProfile
                    };
                }
            }
        });

        modal.result.then(res => {
            /*@LOG*/ this.$log.debug('CROPPED IMAGE => ', res);
            this.memberData.profile = {
                file: res.cropped
            };
        });
    }

    postData() {
        let data = angular.copy(this.memberData);
        /*@LOG*/ this.$log.debug(data);
        this.APIService.resource('members.detail', { id: data.id }).post(data)
        .then(res => {
            this.$log.debug(res);
        });
    }
}